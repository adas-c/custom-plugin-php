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
    wp_register_style('uniblocktypecss', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('uniblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', "wp-element", 'wp-editor'));
    register_block_type("ourplugin/uni-block-react", array(
      'editor_script' => 'uniblocktype',
      'editor_style' => 'uniblocktypecss',
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($props) {
    if (!is_admin()) {
      wp_enqueue_script('attentionFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0', true);
      wp_enqueue_style('attentionFrontEndStyle', plugin_dir_url(__FILE__) . "build/frontend.css");
    }
    ob_start(); ?>
    <div class="paying-attention-update-me">
      <pre style="display: none"><?php echo wp_json_encode($props); ?></pre>
    </div> 
    <?php return ob_get_clean();
  }


}

$uniblockreact = new UniBlockReact();