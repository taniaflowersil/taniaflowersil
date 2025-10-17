jQuery(function($) {
    if (typeof wc_checkout_params === 'undefined')
        return false;

    $(document.body).on("click", ".close_popup_meshulam", function(evt) {
        $('.popup_overlay_meshulam').remove();
    });
    $(document.body).on("click", "#place_order", function(evt) {
        var payment_method = jQuery('form[name="checkout"] input[name="payment_method"]:checked').val();
        var Form = $(this).parents('form.checkout');
        $(".woocommerce-error").remove();
        if (payment_method == 'bitpay-payment' || payment_method == 'meshulam-payment' || payment_method == 'apple-payment' || payment_method == 'cal-payment' || payment_method == 'googlepay-payment') {
            evt.preventDefault();
            $('.main_meshulam_loader').show();
            $.ajax({
                type: 'POST',
                url: '?wc-ajax=checkout',
                dataType: 'json',
                data: Form.serializeArray(),
                success: function(response) {
                    // console.log(response);
                    if (response.result == 'failure') {
                        $('.main_meshulam_loader').hide();
                        $( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
                        $('.woocommerce-notices-wrapper:first').prepend(response.messages);
                        $( document.body ).trigger( 'wc_notices_refreshed' );
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    }
                    if (response.result == 'success') {
                        var red_url = response.redirect;
                        var order_id = response.order_id;
                        var action = 'meshulam_popup_payment_iframe';
                        $.ajax({
                            type: 'POST',
                            url: wc_checkout_params.ajax_url,
                            dataType: 'html',
                            data: { order_id: order_id, action: action },
                            success: function(result) {
                                $('.main_meshulam_loader').hide();
                                if (result == 'false') {
                                    window.location.href = red_url;
                                }
                                if(payment_method == 'apple-payment'){
                                    window.location.href = result;
                                    return;
                                }
                                $('body').append(result);
                                $(".close_popup_meshulam").fadeIn(6000);
                            },
                            error: function(error) {
                                $('.main_meshulam_loader').hide();
                                console.log(error); // For testing (to be removed)
                            }
                        });
                    }

                },
                error: function(error) {
                    $('.main_meshulam_loader').hide();
                    console.log(error); // For testing (to be removed)
                }
            });
        }
        if (payment_method == 'grow-wallet-payment') {
            evt.preventDefault();
            $('.main_meshulam_loader').show();
            $.ajax({
                type: 'POST',
                url: '?wc-ajax=checkout',
                dataType: 'json',
                data: Form.serializeArray(),
                success: function(response) {
                    // console.log(response);
                    if (response.result == 'failure') {
                        $('.main_meshulam_loader').hide();
                        $( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
                        $('.woocommerce-notices-wrapper:first').prepend(response.messages);
                        $( document.body ).trigger( 'wc_notices_refreshed' );
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    }
                    if (response.result == 'success') {
                        var red_url = response.redirect;
                        var order_id = response.order_id;
                        var action = 'meshulam_grow_wallet_iframe';
                        $.ajax({
                            type: 'POST',
                            url: wc_checkout_params.ajax_url,
                            dataType: 'json',
                            data: { order_id: order_id, action: action },
                            success: function(result) {
                                // console.log(result);
                                $('.main_meshulam_loader').hide();
                                if (result == 'false') {
                                    window.location.href = red_url;
                                }
                                else{
                                    growPayment.renderPaymentOptions(result.token);
                                    redirect = result.thank_you_url;
                                }
                                $(".close_popup_meshulam").fadeIn(6000);
                            },
                            error: function(error) {
                                $('.main_meshulam_loader').hide();
                                console.log(error); // For testing (to be removed)
                            }
                        });
                    }

                },
                error: function(error) {
                    $('.main_meshulam_loader').hide();
                    console.log(error); // For testing (to be removed)
                }
            });
        }
    });
});