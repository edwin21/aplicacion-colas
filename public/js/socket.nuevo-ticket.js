//  Comando para establecer la conexion

var socket = io();

socket.on('connect', function() {

    console.log('conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

socket.on('estadoActual', function(data) {
    console.log('Estado actual...', data);
    $('#lblNuevoTicket').empty().append(data.ultimo)

})


$('button').on('click', function() {

    console.log('click button');

    // Enviar informacion
    socket.emit('siguienteTicket', null, function(resp) {
        console.log('siguiente ticket: ', resp)
        $('#lblNuevoTicket').empty().append(resp.siguiente)

    });


});