using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using System.Text.Json.Serialization;

namespace RelatorioService.Services;

public class PdfGenerator
{
    public byte[] GerarRelatorio(string secao, List<Dictionary<string, object>> dados)
    {
        using (var memoryStream = new MemoryStream())
        {
            var writer = new PdfWriter(memoryStream);
            var pdf = new PdfDocument(writer);
            var document = new Document(pdf);

            // Título
            document.Add(new Paragraph($"RELATÓRIO - {secao.ToUpper()}")
                .SetFontSize(20)
                .SetBold());

            document.Add(new Paragraph($"Data: {DateTime.Now:dd/MM/yyyy HH:mm}")
                .SetFontSize(10));

            document.Add(new Paragraph(""));

            // Tabela
            var table = new Table(dados.FirstOrDefault()?.Keys.Count ?? 1);

            // Headers
            if (dados.Any())
            {
                foreach (var header in dados.First().Keys)
                {
                    table.AddHeaderCell(new Cell().Add(new Paragraph(header).SetBold()));
                }

                // Dados
                foreach (var row in dados)
                {
                    foreach (var value in row.Values)
                    {
                        table.AddCell(new Cell().Add(new Paragraph(value?.ToString() ?? "")));
                    }
                }
            }

            document.Add(table);
            document.Close();

            return memoryStream.ToArray();
        }
    }
}

public class RelatorioRequest
{
    [JsonPropertyName("secao")]
    public string Secao { get; set; } = "";

    [JsonPropertyName("dados")]
    public List<Dictionary<string, object>> Dados { get; set; } = new();
}
