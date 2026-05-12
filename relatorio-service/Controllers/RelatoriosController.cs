using Microsoft.AspNetCore.Mvc;
using RelatorioService.Services;
using System.Text.Json;

namespace RelatorioService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly PdfGenerator _pdfGenerator = new();
    private readonly HttpClient _httpClient = new();

    public RelatoriosController()
    {
        _httpClient.BaseAddress = new Uri("http://localhost:8000");
    }

    [HttpPost("gerar")]
    public async Task<IActionResult> GerarRelatorio([FromBody] RelatorioRequest request)
    {
        try
        {
            var dados = await BuscarDados(request.Secao);
            var pdf = _pdfGenerator.GerarRelatorio(request.Secao, dados);

            return File(pdf, "application/pdf", $"relatorio_{request.Secao}_{DateTime.Now:yyyyMMdd_HHmmss}.pdf");
        }
        catch (Exception ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    private async Task<List<Dictionary<string, string>>> BuscarDados(string secao)
    {
        var endpoint = secao.ToLower() switch
        {
            "produtos" => "/products",
            "clientes" => "/clients",
            "vendas" => "/sales",
            _ => throw new Exception("Seção inválida")
        };

        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        var items = new List<Dictionary<string, string>>();

        using (var doc = JsonDocument.Parse(json))
        {
            var root = doc.RootElement;

            // Se é um array direto
            if (root.ValueKind == JsonValueKind.Array)
            {
                items = ConvertJsonArrayToDictList(root);
            }
            // Se é um objeto com propriedade "data" ou similar
            else if (root.ValueKind == JsonValueKind.Object)
            {
                // Tenta encontrar a propriedade que contém os dados
                foreach (var property in root.EnumerateObject())
                {
                    if (property.Value.ValueKind == JsonValueKind.Array)
                    {
                        items = ConvertJsonArrayToDictList(property.Value);
                        break;
                    }
                }
            }
        }

        return items;
    }

    private List<Dictionary<string, string>> ConvertJsonArrayToDictList(JsonElement array)
    {
        var result = new List<Dictionary<string, string>>();

        foreach (var item in array.EnumerateArray())
        {
            var dict = new Dictionary<string, string>();

            if (item.ValueKind == JsonValueKind.Object)
            {
                foreach (var property in item.EnumerateObject())
                {
                    var value = property.Value.ValueKind switch
                    {
                        JsonValueKind.String => property.Value.GetString() ?? "",
                        JsonValueKind.Number => property.Value.GetDecimal().ToString(),
                        JsonValueKind.True => "true",
                        JsonValueKind.False => "false",
                        JsonValueKind.Null => "-",
                        _ => property.Value.ToString()
                    };

                    dict[property.Name] = value;
                }
            }

            if (dict.Any())
            {
                result.Add(dict);
            }
        }

        return result;
    }
}
