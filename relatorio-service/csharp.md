# Serviço de Relatórios - ATLAS CONTROL

Serviço backend em C# para geração de relatórios em PDF.

## Requisitos

- .NET 10.0 SDK 
- Backend Python rodando na porta 8000

## Instalação

```bash
cd relatorio-service
dotnet restore
```

## Execução

```bash
dotnet run
```

O serviço será executado na porta 5000.

## Endpoints

### POST /api/relatorios/gerar

Gera um relatório em PDF.

**Body:**
```json
{
  "secao": "produtos"
}
```

**Seções disponíveis:**
- `produtos`
- `clientes`
- `vendas`

**Resposta:**
- Arquivo PDF para download

## Arquitetura

- **Program.cs**: Configuração da aplicação e CORS
- **Controllers/RelatoriosController.cs**: Endpoints da API
- **Services/PdfGenerator.cs**: Lógica de geração de PDF

## Dependências

- iText7: Geração de PDFs
- Newtonsoft.Json: Serialização JSON

## Notas

- O serviço comunica com o backend Python em `http://localhost:8000`
- CORS está habilitado para aceitar requisições do frontend
