<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DataConsumerController extends Controller
{

    /**
     * Create a method that will consume and process
     * the data from a data provider.
     * 
     * @method process_data
     * @param Request<Object>
     * @return String
     */
    public function process_data(Request $request)
    {
      // Declare a default result response 
      (String) $result = 'Mmmm, so you\'re trying to be a wise guy 🤨. You\'ve selected all the blocks! Try deselect one to have the data returned formatted.';
      
      if (count($request->input('values')) !== $request->input('max')) {  
        // Find the missing values
        (Array) $values = $this->find_missing_values([
          'inputs' => $request->input('values'),
          'max' => $request->input('max')
        ]);

        // Format the found missing values set 
        // the result to respected formatted
        (String) $result = $this->format_sequence([
          'values' => $values
        ]);
      }

      return json_encode($result);
    }

    /**
     * Create a method that will take an array and 
     * format the inner values based on a specific 
     * sequence.
     * 
     * @method format_sequence
     * @param Array<Number>
     * @return String
     */
    private function format_sequence(Array $sequence) 
    {
      if (count($sequence['values'])) {
        (String) $result = '';
        (Boolean) $skip = false;
        (Array) $values = $sequence['values'];
        foreach ($values as $key => $value) {
          // Check if we have the first value when looping
          (Boolean) $first_value_in_loop = ($key == 0) ? true : false;
          // Check if we reached the last value when looping 
          (Boolean) $last_value_in_loop = count($values) != $key + 1;
          // Check if a sequence is about to start
          (Boolean) $sequence_started = ($last_value_in_loop) ? $values[($key + 1)] == $value + 1 : false;
          // Determain if we've encounted a sequence
          // so we can start formating the values
          if ($last_value_in_loop && $sequence_started) {
            if (!$skip) $result .= ($first_value_in_loop) ? $value . '-' : ',' . $value . '-';
            $skip = true;
          } else {
            $result .= ($first_value_in_loop || $skip) ? $value : ',' . $value;
            $skip = false;
          }
        }
        return $result;
      }
    }
    
    /**
     * Create a method that will sort and find
     * missing values in a list once computed
     * the a new list will be returned with
     * the found missing values.
     * 
     * @method find_missing_values
     * @param Array<Number>
     * @return Array<Number>
     */
    private function find_missing_values(Array $values) 
    {
      if (count($values)) {
        (Array) $missing_values = [];
        (Array) $list = $values['inputs'];
        sort($list, SORT_NUMERIC);
        for ($index = 1; $index <= $values['max']; ++$index) {
          if (!in_array($index, $list)) {
            array_push($missing_values, $index);
          }
        }
        return $missing_values;
      }
    }

}
