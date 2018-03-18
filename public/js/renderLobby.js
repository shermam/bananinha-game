export function renderLobby(container) {

    return function (lobby) {

        container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Sala</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
                ${Object.keys(lobby).map(key => `
                    <tr>
                        <td>
                            <a href="./${key}">
                                ${lobby[key].nome}
                            </a>
                        </td>
                        <td>${key}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `;
    }
}