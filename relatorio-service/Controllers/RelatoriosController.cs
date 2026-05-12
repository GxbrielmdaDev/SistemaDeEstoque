using Microsoft.AspNetCore.Mvc;
using RelatorioService.Services;
using System.Net.Http.Json;

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

    private async Task<List<Dictionary<string, object>>> BuscarDados(string secao)
    {
        var endpoint = secao.ToLower() switch
        {
            "produtos" => "/api/produtos",
            "clientes" => "/api/clientes",
            "vendas" => "/api/vendas",
            _ => throw new Exception("Seção inválida")
        };

        var response = await _httpClient.GetAsync(endpoint);
        var json = await response.Content.ReadAsStringAsync();

        var items = System.Text.Json.JsonSerializer.Deserialize<List<Dictionary<string, object>>>(json) 
            ?? new List<Dictionary<string, object>>();

        return items;
    }
}
