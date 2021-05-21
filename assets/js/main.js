$(document).ready(function() {

    document.getElementById('superBoton').addEventListener('click', () => {


        let heroeNumero = document.getElementById('heroeNumero').value;
        let regexvalor = /^[0-9]+$/gm;
        let validaNumero = regexvalor.test(heroeNumero);

        if (validaNumero == false) {
            document.getElementById('errorNumero').innerHTML = `Debe ingresar solo números desde el 1 al 732, para más información <a href="https://www.superheroapi.com/ids.html">presione aquí</a>`

        } else {


            if (heroeNumero < 0 || heroeNumero > 732) {
                alert('el Número de SuperHero no puede ser desde 1 a 732')
            } else {
                document.getElementById('errorNumero').innerHTML = ""


                $.ajax({
                    type: "get",
                    dataType: "Json",
                    url: `https://www.superheroapi.com/api.php/10159283131357910/ ${heroeNumero}`,
                    success: function(datos) {


                        let nombre = datos.biography["full-name"]
                        let relatives = datos.connections.relatives
                        let publica = datos.biography.publisher
                        let ocupacion = datos.work.occupation
                        let aparicion = datos.biography["first-appearance"]
                        let altoPl = datos.appearance.height[0]
                        let altoCm = datos.appearance.height[1]
                        let pesoLb = datos.appearance.weight[0]
                        let pesoKl = datos.appearance.weight[1]
                        let amigos = datos.connections["group-affiliation"]
                        let imagen = datos.image.url;


                        $("#resultado").html(`
                            <h3 class="text-center">SuperHero Encontrado</h3>
                                <div class="card mb-3 col-md-12 border-secondary">
                                <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${imagen}" class="card-img" alt="...">
                                </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Nombre ${nombre}</h5>
                                            <p class="card-text">Conexiones: ${relatives}</p>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Publicado por: ${publica}</li>
                                                <li class="list-group-item">Ocupación: ${ocupacion}</li>
                                                <li class="list-group-item">Primera Aparición: ${aparicion}</li>
                                                <li class="list-group-item">Altura: ${altoPl} - ${altoCm}</li>
                                                <li class="list-group-item">Peso: ${pesoLb} - ${pesoKl}</li>
                                                <li class="list-group-item">Alianzas: ${amigos}</li>
                                            </ul>
                                            <div class="card-footer bg-transparent border-success">@JP Todos los derechos reservados</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>     
                `);

                        let powerIntel = datos.powerstats.intelligence;
                        let powerStre = datos.powerstats.strength;
                        let powerSpeed = datos.powerstats.speed;
                        let powerDura = datos.powerstats.durability;
                        let powerPower = datos.powerstats.power;
                        let powerCombat = datos.powerstats.combat

                        var chart = new CanvasJS.Chart("tortaHeroica", {
                            theme: "light1", // "light1", "light2", "dark1", "dark2"
                            exportEnabled: true,
                            animationEnabled: true,
                            title: {
                                text: `Estadísticas de poder para ${nombre}`
                            },

                            data: [{
                                type: "pie",
                                startAngle: 25,
                                toolTipContent: "<b>{label}</b>: {y}%",
                                showInLegend: "true",
                                legendText: "{label}",
                                indexLabelFontSize: 16,
                                indexLabel: "{label} - ({y})",
                                dataPoints: [{
                                    y: powerIntel,
                                    label: "intelligence"
                                }, {
                                    y: powerStre,
                                    label: "strength"
                                }, {
                                    y: powerSpeed,
                                    label: "speed"
                                }, {
                                    y: powerDura,
                                    label: "durability"
                                }, {
                                    y: powerPower,
                                    label: "power"
                                }, {
                                    y: powerCombat,
                                    label: "combat"
                                }]
                            }]
                        });
                        chart.render();



                    }
                });
            };
        };
    });
});