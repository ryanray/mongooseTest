jQuery(function(){

	var handleStatusChange = function(elm, isCompleteStatus){
		var $parent = jQuery(elm).parents('tr');
		var $form = $parent.find('form.edit-form');

		var $isComplete = $form.find('input[name="kittenIsComplete"]');

		$isComplete.val( isCompleteStatus );

		$form.submit();		
	};

	jQuery('.markComplete').on('click', function(e){
		e.preventDefault();
		handleStatusChange(this, true);
	});

	jQuery('.markIncomplete').on('click', function(e){
		e.preventDefault();
		handleStatusChange(this, false);
	});


});