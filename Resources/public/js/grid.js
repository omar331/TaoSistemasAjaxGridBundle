var tao_grid_checkall = {};

function tao_grid_init( grid_id ) {
    var r0 = $('DIV.batch.' + grid_id );
    var r = r0.closest('DIV.grid');

    r0.find('SELECT').change( tao_grid_selected );
    r0.find('A.fancybox').fancybox({'width': 800, 'height': 300});

    window.setInterval('tao_grid_batch_menu(' + grid_id + ')', 1000);
}

function tao_grid_selected(e) {
    var v = $(e.target).val();
    var o = $.parseJSON(v);
    $(e.target).closest('.grid').find('A.trigger').attr('href', o['href'] );
    $(e.target).closest('.grid').find('A.trigger').attr('title', o['title'] );
    $(e.target).closest('.grid').find('A.trigger').click();
}

function tao_check_all_clicked(e) {
    $(e.target).closest('DIV.list').find('.item_id').each( function() {
        this.checked = e.target.checked;
    });
}

function tao_grid_remove_selection( grid_id ) {
    var r0 = $('DIV.batch.' + grid_id );
    var r = r0.closest('DIV.grid');

    r.find('.item_id').each( function() {
        this.checked = false;
    });

    r.find('.all_filtered').attr('checked', false);
}

function tao_grid_batch_menu( grid_id ) {
    var r0 = $('DIV.batch.' + grid_id );
    var r = r0.closest('DIV.grid');

    if ( checkall = r.find('.list').find('INPUT.check_all') ) {
        if ( checkall.attr('taogrid_active') != 1 ) {
            checkall.bind('click', tao_check_all_clicked );
            checkall.attr('taogrid_active', 1);
        }
    }

    var items = [];
    r.find('.item_id').each( function() {
        if ( this.checked ) items.push(this.value);
    });
    it_chk = items.length;

    if ( it_chk > 0 ) {
        r0.find('SELECT.op').val('');
        r0.find('.sel').html(it_chk + ' ' + ( it_chk == 1 ? ' item' : ' itens' ) );
        r0.fadeIn('slow');
    } else {
        r0.fadeOut('fast');
    }

    /* store selected item ids in a cookie */
    if ( p = r.attr('id') ) {
        cookie_name = p + '_selected_ids';
    } else {
        cookie_name = 'tao_grid_selected_ids';
    }

    if ( r0.find('INPUT.all_filtered:first').attr('checked') ) {
        v = 'all_filtered';
    } else {
        v = items.join('|');
    }

    $.cookie(cookie_name, v, {path:'./'});
}


function tao_grid_set_page(obj, page) {
    r0 = $(obj).closest('DIV.grid');
    filter = r0.find('DIV.filter').find('FORM');
    filter.find('INPUT[name=page]').val(page);
    filter.submit();
}

function tao_grid_set_sort_column(obj, col, dir) {
    r0 = $(obj).closest('DIV.grid');
    filter = r0.find('DIV.filter').find('FORM');
    filter.find('INPUT[name=page]').val(1);
    filter.find('INPUT[name=sort_col]').val(col);
    filter.find('INPUT[name=sort_dir]').val(dir);
    filter.submit();
}
