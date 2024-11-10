import JsReport from "jsreport";
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from "path";

// Inicializar jsreport una sola vez
const reporting = JsReport({
  core: {
    tempDirectory: '../reports', // Directorio para archivos temporales
  },
});

// Asegurarse de que jsreport se inicializa solo una vez
let isJsReportInitialized = false;
const initializeJsReport = async () => {
  if (!isJsReportInitialized) {
    await reporting.init();
    isJsReportInitialized = true;
  }
};

// Función para generar el reporte
export const generateProspectsReport = async (prospects, id) => {
  try {
    // Asegúrate de que jsreport esté inicializado antes de generar el reporte
    await initializeJsReport();
    // Crear la plantilla del informe
    const reportTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              text-align: center;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            tr:hover {
              background-color: #f1f1f1;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 0.9rem;
              color: #555;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Reporte de Prospectos</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Apto</th>
                <th>Torre</th>
                <th>Asesor</th>
              </tr>
            </thead>
            <tbody>
              {{#each prospects}}
                <tr>
                  <td>{{this.id}}</td>
                  <td>{{this.nombrecliente}}</td>
                  <td>{{this.telefonocliente}}</td>
                  <td>{{this.emailcliente}}</td>
                  <td>{{this.nombreapto}}</td>
                  <td>{{this.torre}}</td>
                  <td>{{this.nombreasesor}}</td>
                </tr>
              {{/each}}
            </tbody>
          </table>
          <div class="footer">
            <p>Este reporte fue generado por Camu SAS</p>
            <p>Derechos reservados © ${new Date().getFullYear()}</p>
          </div>
        </body>
      </html>`;

    // Generar el informe en PDF
    const report = await reporting.render({
      template: {
        content: reportTemplate,
        engine: 'handlebars',
        recipe: 'chrome-pdf', // Cambiar a chrome-pdf para generar PDF
        orientation: 'landscape', // Establecer la orientación en horizontal
      },
      data: {
        prospects,
      },
    });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Ahora puedes usar __dirname en tu ruta
    const reportPath = path.join(__dirname, '..', 'reports', 'prospects-report-' + id + '.pdf');

    // Guardar el PDF en el sistema de archivos
    fs.writeFileSync(reportPath, report.content);
    console.log(`Reporte guardado en: ${reportPath}`);

    return reportPath; // Retornar la ruta del archivo guardado si es necesario
  } catch (error) {
    console.error("Error generating report:", error);
    throw error; // Manejar el error según sea necesario
  }
};
