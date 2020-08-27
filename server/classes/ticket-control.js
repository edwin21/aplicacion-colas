const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}
class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let json = require('../data/data.json');
        //console.log(json);

        if (json.hoy === this.hoy) {

            this.ultimo = json.ultimo;
            this.tickets = json.tickets;
            this.ultimos4 = json.ultimos4;
        } else {

            this.reiniciarConteo();
        }
    }

    estadoActual() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // Elimina el primer elemento del arreglo.

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); // Agrega un elemento al inicio del arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Esto borra el ultimo elemento del arreglo. 
        }

        console.log('ultimos 4', this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }
    siguiente() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }
    reiniciarConteo() {

        this.ultimos4 = [];
        this.tickets = [];
        this.ultimo = 0;

        this.grabarArchivo();
    }
    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        // console.log('Se ha inicializado el sistema');
    }

}

module.exports = {
    TicketControl
}