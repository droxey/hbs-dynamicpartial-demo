$(document).ready(function() {
  // Focus the first form field.
  // Protip: jQuery has no focus() method; but native JavaScript does. 
  // So, convert the jQuery element to a JavaScript object via [0] or .get(0)
  $('input[type="text"]').get(0).focus();
  
  
  $(document).on("submit", "#employee-form", function(event) {
    // Don't allow the form to submit. 
    event.preventDefault();
    
    // Keep a reference to the form for later use.
    var form = $(this);
    
    // Submit form via ajax.
    $.ajax(form.attr('action'), {
      type: "POST",
      data: form.serialize()
    }).then(
      function(renderedPartial) {
        // Remove the 'active' class from list items.
        $('#employees li').removeClass('active');
        
        // Convert the renderedPartial String to a jQuery object.
        var newEmployeeListItem = $(renderedPartial);
        
        // Add a class to indicate that it's new.
        newEmployeeListItem.addClass('active');
        
        // Add to the top of the employees list with .prepend()
        $('#employees').prepend(newEmployeeListItem);
        
        // Clear the form. Protip: See above.
        form.get(0).reset();
      }
    );
  });
});