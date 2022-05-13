fetch("../json/product.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let product of products) {
            out += `
            <tr>
              <td>${product.Status}</td>
              <td>${product.Quote_Number}</td>
              <td>${product.Agreement_Name}</td>
              <td>${product.Agreement_Type}</td>
              <td>${product.Distributor_Name}</td>
              <td>${product.Effective_Date}</td>
              <td>${product.Expiration_Date}</td>
              <td>${product.Created_Date}</td>
              <td>${product.Days_Until_Expiration}</td>
            </tr>
        `;
        }
        placeholder.innerHTML = out;
    });
