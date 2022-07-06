


    $(document).ready(function () { 
        const $btn =$('#js-showmore');
        const $blc =$('#js-accordion');
        const $close = $('#js-closeac');
        $btn.on('click', function(){
            $blc.slideToggle(300);
        });

        $close.on('click', function(){
            $blc.slideUp(300);

        });


    });