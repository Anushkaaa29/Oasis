function convertTemperature() {
      let value = parseFloat(document.getElementById("tempValue").value);
      let unit = document.getElementById("unit").value;
      let c, f, k;

      let resultBox = document.getElementById("result");

      if (isNaN(value)) {
        resultBox.innerHTML = "⚠️ Please enter a valid number.";
        return;
      }

      if (unit === "C") {
        c = value;
        f = (value * 9/5) + 32;
        k = value + 273.15;
      } else if (unit === "F") {
        c = (value - 32) * 5/9;
        f = value;
        k = (value - 32) * 5/9 + 273.15;
      } else if (unit === "K") {
        c = value - 273.15;
        f = (value - 273.15) * 9/5 + 32;
        k = value;
      }

      resultBox.innerHTML = `
        <strong>Converted Values:</strong><br><br>
        🌍 Celsius: <b>${c.toFixed(2)} °C</b><br>
        🔥 Fahrenheit: <b>${f.toFixed(2)} °F</b><br>
        ❄️ Kelvin: <b>${k.toFixed(2)} K</b>
      `;
    }
