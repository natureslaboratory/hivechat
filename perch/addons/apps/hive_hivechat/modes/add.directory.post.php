<?php    

    # Main panel
    echo $HTML->main_panel_start();
    
//     include('_subnav.php');

     // DISPLAY THE HEADING (EDIT/NEW)
    echo $HTML->heading1($heading1);
//     if ($heading2) echo '<h2>'.$heading2.'</h2>';

     // IF THERE'S A MESSAGE DISPLAY IT
    if ($message){
          
      echo $message; 
    }else{
        
//         $suppliers = $Suppliers_All->all();
//         $Suppliers = array();
//         $Suppliers[] = ['label'=>'Please Select','value'=>''];
//         foreach ($suppliers as $Supplier){
//           $Suppliers[] = ['label'=>$Supplier->name(),'value'=>$Supplier->supplierID()];
//         }
		$categories = [
			['label'=>'Please Select', 'value'=>''], 
			['label'=>'Activities','value'=>'activities'], 
			['label'=>'Local History','value'=>'local-history'], 
			['label'=>'Museums','value'=>'museums'], 
			['label'=>'Galleries','value'=>'galleries'], 
			['label'=>'Shopping','value'=>'shopping'], 
			['label'=>'Services','value'=>'services'], 
			['label'=>'Restaurants','value'=>'restaurants'], 
			['label'=>'Cafes & Tearooms','value'=>'cafes-tearooms'], 
			['label'=>'Fish & Chips','value'=>'fish-and-chips'], 
			['label'=>'Pubs, Inns & Bars','value'=>'pubs-inns-bars'], 
			['label'=>'Hotels','value'=>'hotels'], 
			['label'=>'Bed & Breakfast','value'=>'bed-and-breakfast'], 
			['label'=>'Cottages & Self Catering','value'=>'cottages-self-catering'],
			['label'=>'Camping & Caravan Sites','value'=>'camping-caravan-sites'],
		];
        
        echo $Form->form_start();

        // THIS IS A FIELD CREATED HERE

//         if (!$heading2) echo $Form->select_field('supplierID', 'Supplier', $Suppliers, isset($details['supplierID'])?$details['supplierID']:'active');
      
//         $code = $Directories->get_latest_plus_one();

        echo $Form->text_field('memberID', 'Member ID', isset($details['memberID'])?$details['memberID']:false, 'm input-simple');

//         echo $Form->date_field('date', 'Order Date', isset($details['date'])?$details['date']:false, true);
        echo $Form->text_field('listingTitle', 'Listing Title', isset($details['listingTitle'])?$details['listingTitle']:false, 'm input-simple');
        
        echo $Form->text_field('businessSlug', 'Slug', isset($details['businessSlug'])?$details['businessSlug']:false, 'm input-simple');
      
        echo $Form->select_field('businessCategory', 'Business Category', $categories, isset($details['businessCategory'])?$details['businessCategory']:'active');
        
        echo $Form->text_field('tags', 'Tags', isset($details['tags'])?$details['tags']:false, 'm input-simple');
      
      // THIS GETS ALL OTHER FIELDS FROM THE TEMPLATE FILE
        echo $Form->fields_from_template($Template, $details, $Directories->static_fields);

      // THIS IS THE SUBMIT BUTTON
        echo $Form->submit_field('btnSubmit', $buttonText, $API->app_path()."/directory/");

        echo $Form->form_end();	 
      
    
    }
    
    echo $HTML->main_panel_end();