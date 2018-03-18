export function renderLobby(container, lobby) {
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Sala</th>
                </tr>
            </thead>
            <tbody>
                ${lobby.map(sala => `
                    <tr>
                        <td>
                            <a href="#">
                                ${sala.nome}
                            </a>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}