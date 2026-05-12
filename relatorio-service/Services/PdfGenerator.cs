using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using System.Text.Json.Serialization;

namespace RelatorioService.Services;

public class PdfGenerator
{
    public byte[] GerarRelatorio(string secao, List<Dictionary<string, string>> dados)
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

            if (dados.Count == 0)
            {
                document.Add(new Paragraph("Nenhum dado disponível para esta seção.")
                    .SetFontSize(12));
            }
            else
            {
                // Tabela com largura automática
                var colCount = dados.First().Keys.Count;
                var table = new Table(colCount);
                table.SetWidth(iText.Layout.Properties.UnitValue.CreatePercentValue(100));

                // Headers
                foreach (var header in dados.First().Keys)
                {
                    var headerCell = new Cell()
                        .Add(new Paragraph(header).SetBold())
                        .SetBackgroundColor(new iText.Kernel.Colors.DeviceGray(0.8f));
                    table.AddHeaderCell(headerCell);
                }

                // Dados
                foreach (var row in dados)
                {
                    foreach (var value in row.Values)
                    {
                        var text = !string.IsNullOrEmpty(value) ? value : "-";
                        // Trunca textos muito longos
                        if (text.Length > 100)
                            text = text.Substring(0, 97) + "...";

                        table.AddCell(new Cell().Add(new Paragraph(text)));
                    }
                }

                document.Add(table);
            }

            document.Close();

            return memoryStream.ToArray();
        }
    }
}

public class RelatorioRequest
{
    [JsonPropertyName("secao")]
    public string Secao { get; set; } = "";
}
