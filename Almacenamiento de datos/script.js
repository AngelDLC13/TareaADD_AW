document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('clienteForm');
    const tableBody = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validarFormulario()) {
            guardarCliente();
            mostrarClientes();
            form.reset();
        }
    });

    function validarFormulario() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
        const apellidoRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const telefonoRegex = /^\d{7,14}$/; // 7 a 14 números.

        if (!nombreRegex.test(nombre)) {
            alert('Nombre inválido');
            return false;
        }
        if (!apellidoRegex.test(apellido)) {
            alert('Apellido inválido');
            return false;
        }
        if (!emailRegex.test(email)) {
            alert('Correo electrónico inválido');
            return false;
        }
        if (!telefonoRegex.test(telefono)) {
            alert('Número de teléfono inválido');
            return false;
        }
        return true;
    }

    function guardarCliente() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        const cliente = { nombre, apellido, email, telefono };

        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function mostrarClientes() {
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        tableBody.innerHTML = '';
        clientes.forEach(cliente => {
            let row = tableBody.insertRow();
            row.insertCell(0).textContent = cliente.nombre;
            row.insertCell(1).textContent = cliente.apellido;
            row.insertCell(2).textContent = cliente.email;
            row.insertCell(3).textContent = cliente.telefono;
        });
    }

    mostrarClientes();
});
