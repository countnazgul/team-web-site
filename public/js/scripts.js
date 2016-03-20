$(function() {

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    $('.dataLink').on("click", function() {
        window.location.href = "?area=" + $(this).parent().parent().siblings().text() + "&subarea=" + $(this).text().toLowerCase();
        //getData($(this).parent().parent().siblings().text(), $(this).text().toLowerCase());
    });

    $('.dataLinkTeam').on("click", function() {
        window.location.href = "?area=team&subarea=team";
        //getData('team', 'team');
    });

    //window.location.href = "http://stackoverflow.com";
    if (!getUrlParameter('area')) {
        getData('team', 'team');
    }
    else {
        getData(getUrlParameter('area'), getUrlParameter('subarea'));
    }

    $(".cell").hover(function() {
        console.log('test');
    });

    $(".mainLink").hover(function() {
        $(this).animate({
            color: '#fed900'
        }, "slow");
    }, function() {
        $(this).animate({
            color: '#000000'
        }, "slow");
    });


    function getData(area, subarea) {

        $('#tilewall').html('');
        $('#areaDecr').html('');
        $('#extraFooter').html('');

        $.get("data/" + area + "/" + subarea, function(data) {

            //$('#areaDecr').html(data.descr);
            if(data.footer) {
                $('#extraFooter').html('<div style="text-align: center"><div style="text-align: left; display: inline-block;">' + data.footer + '</div><div>');
            }

            var toAppendHeader =  '<div class="tile tile-fixed" data-width="6" data-height="1" data-position-x="1" data-position-y="1" ">'+data.descr+'</div>';
            $('#areaDecr').append(toAppendHeader);
            
            for (var i = 0; i < data.apps.length; i++) {

                var classCell = '';
                if (data.apps[i].footer.length == 0) {
                    classCell = "tile-empty";
                }

                var beta = '';
                if (data.apps[i].beta != true) {
                    beta = 'display: none;';
                }

                var tooltipClass = '';
                if (data.apps[i].description.length >= 5) {
                    tooltipClass = 'tooltip1';
                }

                var image = '';
                if (data.apps[i].image.length >= 5) {
                    image = data.apps[i].image;
                }
                else {
                    if (data.apps[i].soon == true) {
                        image = '/images/coming_soon.png';
                    }
                    else {
                        if (classCell != 'tile-empty') {
                            image = '/images/no_image.png';
                        }
                    }
                }

                var description = "<div style='font-weight: bold; color: white'>" + data.apps[i].footer + "</div><div>";
                description = description + '' + data.apps[i].description + "</div>";
                
                var toAppend = `<div class="tile tile-fixed` + classCell + `" data-width="1" data-height="1" data-position-x="` + data.apps[i].x + `" data-position-y="` + (data.apps[i].y + 0) + `">
                <a href="#" class="` + tooltipClass + `" title="` + description + `"> 
                <div class="" style="height: 70%; border-style: none; background-image: url('` + image + `'); background-size: 100% 100%;background-repeat: no-repeat;background-size: contain; background-position: 50% 50%;">
                
                <img src="images/beta.png" style="max-width: 100%; max-height: 100%; ` + beta + `"></img>  </div>
                <div class="footer " style="height: 28%; border-style: none; font-size: 15px;" >` + data.apps[i].footer + `
                </div>
                </a>
                </div> `;


                /*var toAppend = `
                                <div title="`+ data.apps[i].tooltip +`" class="`+classCell+`" style="width:200px; background-size: cover ; height: 200px; background-image: url('`+ data.apps[i].image +`') ">
                                <div class="title" style="height: 20%; border-style: none;">` + data.apps[i].title + `</div>
                                <div class="description" style="height: 70%; border-style: none;">` + data.apps[i].description + `</div>
                                <div>
                                <div class="footer" style="height: 10%; border-style: nonwe;">` + data.apps[i].footer + ` 
                                </div></div></div>`;
                */

                //console.log(toAppend)
                $('#tilewall').append(toAppend);
            }

            var options = {
                //shrinkTilesOnViewportWidthSmallerThan: 768,
                maxNumCols: 4,
                minNumCols: 1,
                minTileWidth: 10
            };
            
            var options1 = {
                //shrinkTilesOnViewportWidthSmallerThan: 768,
                maxNumCols: 6,
                minNumCols: 1,
                minTileWidth: 10
            };            

            $("#tilewall").tileWall(options);
            //$("#areaDecr").tileWall(options1);
            
            $('.tooltip1').tooltipster({
                contentAsHTML: true,
                position: 'top-left',
                maxWidth: '500'
            });
        });
    }
});