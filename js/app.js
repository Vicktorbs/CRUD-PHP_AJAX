$(function () {
    console.log('Funciona');
    $('#task-result').hide();
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
})
