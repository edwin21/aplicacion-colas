var socket = io();

// socket.on('connect', function() {

//     console.log('conectado al servidor');
// });

// // escuchar
// socket.on('disconnect', function() {
//     console.log('Perdimos conexion con el servidor');
// })


var searchParams = new URLSearchParams(window.location.search);

// console.log('escritorio...: ' + searchParams.get('escritorio'));
// console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {

    //console.log('clik');
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        console.log(resp.value);
        console.log(resp.err);
        if (resp.err) {
            alert(resp.value);
        } else {
            if (resp.value == 'No hay tickets') {
                $('small').text(resp.value);
                alert(resp.value);
            } else {
                $('small').text(resp.value.numero);
            }

        }

    });

})