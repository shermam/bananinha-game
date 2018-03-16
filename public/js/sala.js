export function createSala() {
    return new Promise(resolve => {
        resolve({
            name: "Sala de: ",
            creatorId: null,
            players: [],
            grid: null,
            turn: 0,
            lastMove: null,
            numberOfPlayers: 2,
            movesToWin: 5,
            tracks: 15,
            initialValue: 'vazio'
        });
    });
}