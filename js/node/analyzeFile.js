/* analyzeFile.js
 *
 * Written by Gerard Roma
 * Copyright (C) 2016 University of Surrey
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the BSD license.  See the LICENSE file for details.
 */


var fs = require("fs");
var WavDecoder = require("wav-decoder");
var stftjs = require("../common/stft.js");
var dsp = require("../common/dsp.js");

var audioSamples;
var stft = new stftjs.stft(1024, 1024, 512, 44100); 

var analyzeFile = function(wavFilePath, jsonFilePath, maxFrames){
  var buffer = fs.readFileSync(wavFilePath);
  WavDecoder.decode(buffer).then(function(audioData){
    var result = stft.analyze(audioData.channelData[0], stft.magnitude, maxFrames);
    var jsonS = JSON.stringify(result);
    fs.writeFileSync(jsonFilePath, jsonS);
  });
};


var songId = process.argv[2];
var dataset = require("msd100_vocals.json");
var wavPath = dataset.base_path + dataset.mixes[songId].mix_path;
var jsonPath = "/path/to/features/" + songId + ".json";
analyzeFile(wavPath, jsonPath, 1000);
