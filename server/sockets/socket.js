const { io } = require('../server');
const { data } = require('../data/data.json');
const { TicketControl } = require('../classes/ticket-control');
const e = require('express');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');


    //Escuchar
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Emitir
    //let estadoActual = ticketControl.ultimo;
    client.emit('estadoActual', {
        'ultimo': ticketControl.estadoActual(),
        'ultimos4': ticketControl.getUltimos4()
    })

    //Escuchar
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            callback({
                err: true,
                value: 'Debe de proporcionar un escritorio'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback({
            err: false,
            value: atenderTicket
        });

        //actualizar / emitir cambios de ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()

        });


    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        console.log('Entramos al metodo siguiente Ticket');

        let siguiente = ticketControl.siguiente();
        console.log('siguiente ticket', siguiente);
        callback({
            siguiente
        });

    });

});