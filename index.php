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
    register_block_type(__DIR__, array(
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($props) {
    // if (!is_admin()) {
    //   wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0', true);
    // }
    ob_start(); ?>
    <div class="paying-attention-update-me">
      <pre style="display: none"><?php echo wp_json_encode($props); ?></pre>
    </div> 
    <?php return ob_get_clean();
  }


}

$uniblockreact = new UniBlockReact();