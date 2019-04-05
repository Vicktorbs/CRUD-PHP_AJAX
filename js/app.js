$(function () {
    console.log('Funciona');
    $('#task-result').hide();
    fetchTask()
    // buscar
    $('#search').keyup(function (e) {
        let search = $('#search').val();
        // console.log(search);
        // metodo ajax de jquery para hacer una peticion al servidor
        if ($('#search').val()) {
            $.ajax({
                url: 'task-search.php',
                data: {search},
                type: 'POST',
                success: function (response) {
                  if(!response.error) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `
                                <li><a href="#" class="task-item">${task.name}</a></li>
                                ` 
                    // console.log(task);
                    
                    });
                    $('#task-result').show();
                    $('#container').html(template);
                  }
                } 
            })
        }
    })

    // Agregar
    $('#task-form').submit(function (e) {
        const psotData = {
            name: $('#name').val(),
            description: $('#description').val()
        }
        $.post('task-add.php', psotData, function (response) {
            console.log(response);
            fetchTask()
            $('#task-form').trigger('reset')
        })
        e.preventDefault();
    })

    // Pintar datos en la interfaz
    function fetchTask() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                console.log(response);
                let tasks = JSON.parse(response)
                console.log(tasks);
                
                let template = ''
                tasks.forEach(task => {
                    template += `
                    <tr>
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td>
                            <button class="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                `
                })
                $('#tasks').html(template)
            }
        })
    }
})
