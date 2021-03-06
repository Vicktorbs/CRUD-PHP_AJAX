$(function () {
    // console.log('Funciona');
    let editar = false
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
            description: $('#description').val(),
            id: $('#taskId').val()
        }
        const url = editar === false ? 'task-add.php' : 'task-edit.php';
        $.post(url, psotData, function (response) {
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
                // console.log(response);
                let tasks = JSON.parse(response)
                // console.log(tasks);
                
                let template = ''
                tasks.forEach(task => {
                    template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a href="#" class="task-item">
                                ${task.name} 
                            </a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="btn btn-danger task-delete">
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

    // Borrar
    $(document).on('click', '.task-delete', (e) => {
        if(confirm('Are you sure you want to delete it?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('taskId');
            $.post('task-delete.php', {id}, (response) => {
                fetchTask();
            });
        }
    });

    // Editar
    $(document).on('click', '.task-item', (e) => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr('taskId');
        $.post('task-single.php', {id}, (response) => {
            // console.log(response);
            
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            editar = true;
        });
        e.preventDefault();
      });
})
