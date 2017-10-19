  function customSelect() {
    $('select.form-select').each(function() {
      var $this = $(this),
        numberOfOptions = $(this).children('option').length,
        selectedValue = "_none",
        selectedText;
      if ($this.get(0).value) {
        selectedValue = $this.get(0).value;
      }
      // console.log(selectedValue);
      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');
      // if(sele)
      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());
      var $list = $('<ul />', {
        'class': 'select-options'
      }).insertAfter($styledSelect);
      for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
        }).appendTo($list);
        if (selectedValue != '_none' && $this.children('option').eq(i).val() == selectedValue) {
          $styledSelect.text($this.children('option').eq(i).text());
        }
      }
      var $listItems = $list.children('li');
      $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function() {
          $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
      });
      $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
      });
      $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
      });
    });
  }