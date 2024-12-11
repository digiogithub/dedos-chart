const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

/**
 * Generate chart
 * @typedef {Object} Args
 * @property {string} d2code - D2lang code to generate chart
 * @param {Args} args
 */
exports.generate_chart = async function generateChart({ d2code }) {
  const tmpDir = path.join(__dirname, "tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const tmpFilePath = path.join(tmpDir, "chart.d2");
  const svgFilePath = path.join(tmpDir, "chart.svg");

  fs.writeFileSync(tmpFilePath, d2code);

  return new Promise((resolve, reject) => {
    exec(`d2 ${tmpFilePath} ${svgFilePath}`, (error) => {
      if (error) {
        return reject(error);
      }

      exec(`open ${svgFilePath}`, (openError) => {
        if (openError) {
          return reject(openError);
        }

        resolve({ svgPath: svgFilePath });
      });
    });
  });
};
