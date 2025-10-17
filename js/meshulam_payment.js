/*jQuery(document).ready(function(){  

    jQuery(document).on('change','.meshulam_pay_exp_type',function(){

        if(jQuery(this).is(':checked')){

            if(jQuery(this).val() == 2){

                jQuery(this).parents('.form-row-radio').next().removeClass('active');

            }else{

                jQuery(this).parents('.form-row-radio').next().addClass('active');

            }

        }

    })

}) */



jQuery(document).ready(function(){

    if(jQuery('p.woocommerce-notice.woocommerce-notice--error.woocommerce-thankyou-order-failed').length > 0){

        console.log('test')

        jQuery('.entry-title').css('display','none');

    }
	
});
jQuery(document).ready(function(){
	if(jQuery('#meshulam_recurring').is(':checked')){
		jQuery('.meshulam-installment-tab_options').show();
	}
	else{
		jQuery('.meshulam-installment-tab_options').hide();
	}
    jQuery('#meshulam_recurring').change(function(){

		if(jQuery(this).is(':checked')){

			jQuery('.meshulam-installment-tab_options').show();

		}else{
            jQuery('#_meshulam_checkbox_field').prop('checked', false); 
            jQuery('#_meshulam_pay_field').val(''); 
			jQuery('.meshulam-installment-tab_options').hide();

		}

	})

});