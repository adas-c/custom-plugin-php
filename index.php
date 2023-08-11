<?php 

/*
  Plugin Name: Filter Plugin Word
  Version: 1.0
  Author: Adam

*/

if (!defined('ABSPATH')) exit;

class UniBlockReact {
  function __construct() {
    add_action('init', array($this, 'adminAssets'));
  }

  function adminAssets() {
    wp_register_script('uniblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', "wp-element"));
    register_block_type("ourplugin/uni-block-react", array(
      'editor_script' => 'uniblocktype',
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($props) {
    ob_start(); ?>
    <h6>hello <?php echo esc_html($props['sky']); ?></h6> 
    <?php return ob_get_clean();
  }


}

$uniblockreact = new UniBlockReact();