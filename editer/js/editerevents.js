$(document).ready(function(){

    for (const type in ACTOR_TYPES) 
    {
        if (ACTOR_TYPES.hasOwnProperty(type) && type != "eraser") 
        {
            const elem = $("<option>");
            elem.attr("value", type);
            elem.html(type);
            $("#type-select").append(elem);
        }
    }

    $("#get-data-btn").click(function(){
        $("#data-display").val(JSON.stringify(game.scene.getScene("chunk-editer").stage.dataLiteral));
    });

    $("#load-data-btn").click(function(){
        game.scene.start("chunk-editer", JSON.parse($("#data-display").val()));
        exitTileMode();
    });

    $("#clear-data-btn").click(function(){
        $("#data-display").val("");
    });

    $('#copy-data-btn').click(function(){
        copyText('data-display');
    });

    $("#new-stage-form-container").hide();

    $("#create-new-btn").click(function(){
        $("#new-stage-form-container").show();
    });

    $("#submit-new-stage-config").click(function(){
        const data = generateStageData(
            Number($("#num-chunks-x").val()),
            Number($("#num-chunks-y").val()),
            Number($("#tiles-per-chunk-x").val()),
            Number($("#tiles-per-chunk-y").val()),
            Number($("#tile-width").val()),
            Number($("#tile-height").val())
        );
        $("#new-stage-form-container").hide();
        exitTileMode();
        game.scene.start("chunk-editer", data);     
    });

    $("#tile-select").click(function(e){
        if ($("#edit-tile-mode-btn").prop("checked"))
        {
            const scene = game.scene.getScene("chunk-editer");
            const tileCountX = $(this).get(0).naturalWidth / scene.data.tileWidth;
            const tileCountY = $(this).get(0).naturalHeight / scene.data.tileHeight;
            const tileX = Math.floor((e.offsetX / $(this).width()) * tileCountX);
            const tileY = Math.floor((e.offsetY / $(this).height()) * tileCountY);
            scene.selectedTileType = tileX + tileCountX * tileY;
            console.log(scene.selectedTileType);
        }
    });

    $("#edit-tile-mode-btn").click(function(){

        if ($(this).prop("checked"))
        {
            enterTileMode();
        }
        else
        {
            exitTileMode();
        }
    });

});