<?php

    function load($modules, $data){
        $data = $data;
        return include('libraries/modules/'.$modules.'.php');
    }
    
    function meta($meta, $data){
        $data = $data;
        return include('libraries/meta/'.$meta.'.php');
    }

    function views($view, $data){
        $data = $data;
        include($view.'.php');
    }
    


?>