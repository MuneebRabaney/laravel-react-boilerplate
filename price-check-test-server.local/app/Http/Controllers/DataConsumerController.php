<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DataConsumerController extends Controller
{

    /**
     * Create a method that will process_data from the data provider
     *
     * @return Object
     */
    public function process_data(Request $request)
    {
      $values = $this->findMissingValues([
        'inputs' => $request->input('input'),
        'max' => $request->input('max')
      ]);
      
      $result = $this->findAndFormatSequence([
        'values' => $values
      ]);
      
      return json_encode($result);
    }

    private function findAndFormatSequence(Array $sequence) {
      if (count($sequence['values'])) {
        $values = $sequence['values'];
        $result = '';
        $in_skip = false;
        foreach ($values as $key => $value) {
          // Define variables needed for the sequence
          $first_loop = ($key == 0) ? true : false;
          $last_in_loop = count($values) != $key + 1;
          $sequence_started = ($last_in_loop) ? $values[($key + 1)] == $value + 1 : false;
          if ($last_in_loop && $sequence_started) {
              if (!$in_skip)  $result .= ($first_loop) ? $value . '-' : ',' . $value . '-';
              $in_skip = true;
          } else {
              $result .= ($first_loop or $in_skip) ? $value : ',' . $value;
              $in_skip = false;
          }
        }
        return $result;
      }
    }
    
    private function findMissingValues(Array $values) {
      if (count($values)) {
        $missingIndexes = [];
        sort($values['inputs'], SORT_NUMERIC);
        for ($index = 1; $index <= $values['max']; ++$index) {
          if (!in_array($index, $values['inputs'])) {
            array_push($missingIndexes, $index);
          }
        }
        return $missingIndexes;
      }
    }

}
