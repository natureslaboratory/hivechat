<?php

    echo $HTML->title_panel([
    'heading' => $Lang->get('Directory'),
    'button'  => [
          'text' => $Lang->get('Add New Directory'),
          'link' => $API->app_nav().'/directory/add/',
          'icon' => 'core/plus',
      ],
    ], $CurrentUser);
    
  # Call Smartbar to create the tabs

    $Smartbar = new PerchSmartbar($CurrentUser, $HTML, $Lang);

//     $Smartbar->add_item([
//         'active' => true,
//         'title' => 'All Purchase Orders',
//         'link'  => '/addons/apps/jc_fabrications/purchases/',
//   ]);

//     $Smartbar->add_item([
//         'active' => false,
//         'title' => 'Search Purchase Orders',
//         'link'  => '/addons/apps/jc_fabrications/purchases/search_purchases/',
//   ]);


    echo $Smartbar->render();

  #Main Panel Start

    $HTML->main_panel_start();

  #Some Content Here
//     $suppliers = $Suppliers_All->all();
//     $Suppliers = array();
//     $Suppliers[] = ['label'=>'Please Select','value'=>''];
//     foreach ($suppliers as $Supplier){
//       $Suppliers[] = ['label'=>$Supplier->name(),'value'=>$Supplier->supplierID()];
//     }

//     echo $Form->form_start();
    

//     echo $Form->select_field('supplierID', 'Search By Supplier', $Suppliers, '');
      
//     echo $Form->date_field('date', 'Seaerch By Order Date', '', true);

//     echo $Form->text_field('ponumber', 'Search By Purchase Order Number', '', 'm input-simple');

//     echo $Form->submit_field('btnSubmit', 'Search', '');

//     echo $Form->form_end();
?>
    <table class="d">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('Title'); ?></th>  
                <th><?php echo $Lang->get('Member ID'); ?></th>
                <th><?php echo $Lang->get('Business Category')?></th>
<!--                 <th><?php //echo $Lang->get('Total Value'); ?></th>               -->
                <th class="action last"> <?php echo $Lang->get('Delete')?></th>
                <!-- <th class="action last"><?php //echo $Lang->get('Delete Bulk Select')?></th> -->
            </tr>
        </thead>
        <tbody>
<?php
//     $Total = 0.00;
    foreach($directories as $Directory) {
//         $Supplier = $Suppliers_All->find($Purchase->supplierID(), true);
//         $items = $Items->findByPurchase($Purchase->id());
//         $Subtotal = 0.00;
//         foreach($items as $item){
//           $Subtotal += $item['price']*$item['quantity'];
//         }
//         $Total += $Subtotal;
?>
            <tr>
                <td class="primary"><a href="<?php echo $HTML->encode($API->app_path()); ?>/directory/add?id=<?php echo $HTML->encode(urlencode($Directory->id())); ?>"><?php echo $HTML->encode($Directory->listingTitle()); ?></a></td>
                <td ><?php echo $HTML->encode($Directory->memberID()); ?></td>
                <td ><?php echo $HTML->encode($Directory->businessCategory()); ?></td>
<!--                 <td>&pound<?php// echo $HTML->encode($Subtotal) ; ?></td>               -->
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/directory/delete?id=<?php echo $HTML->encode(urlencode($Directory->id())); ?>" class="delete inline-delete"><?php echo $Lang->get('Delete'); ?></a></td>
                <!-- <td><?php //echo $Form->checkbox_field('select_'.$Purchase->organisationID(), '', 'on', false); ?></td> -->
            </tr>
<?php   
    }
?>
        </tbody>
    </table>
   
    <!-- Submit Button  -->
     <?php  //echo $Form->submit_field('btnSubmit', 'Delete All Selected', '');?>


<?php    

    //echo '<strong>Total Orders Cost: &pound'.$Total.'</strong>';
  #Main Panel End

    $HTML->main_panel_end();