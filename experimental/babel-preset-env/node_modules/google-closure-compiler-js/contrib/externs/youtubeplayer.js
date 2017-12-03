/*
 * Copyright 2012 YouTube LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Public API calls.
 * @link http://code.google.com/apis/youtube/js_api_reference.html
 * @externs
 */


/**
 * @constructor
 * @extends {HTMLObjectElement}
 */

function YouTubePlayer() {}


/**
 * Plays the currently cued/loaded video.
 *
 */
YouTubePlayer.prototype.playVideo = function() {};


/**
 * Pauses the currently playing video.
 */
YouTubePlayer.prototype.pauseVideo = function() {};


/**
 * Stops the current video. This function also closes the NetStream object and
 * cancels the loading of the video.
 */
YouTubePlayer.prototype.stopVideo = function() {};


/**
 * Clears the video display. This function is useful if you want to clear the
 * video remnant after calling stopVideo().
 */
YouTubePlayer.prototype.clearVideo = function() {};


/**
 * @return {number}  The number of bytes loaded for the current video.
 */
YouTubePlayer.prototype.getVideoBytesLoaded = function() {};


/**
 * @return {number} The size in bytes of the currently loaded/playing video.
 */
YouTubePlayer.prototype.getVideoBytesTotal = function() {};


/**
 * @return {number}  The number of bytes the video file started loading from.
 */
YouTubePlayer.prototype.getVideoStartBytes = function() {};


/**
 * @return {Array}  The current playlist as an array of video IDs.
 */
YouTubePlayer.prototype.getPlaylist = function() {};


/**
 * @return {number}  The current index in the playlist or -1 when the player has
 *                   no playlist.
 */
YouTubePlayer.prototype.getPlaylistIndex = function() {};


/**
 * Calls an option method on the module
 * @param {string} moduleId The module descriptor id.
 * @param {string} option The option to call on the module.
 * @param {*} object Arbitrary data to be sent to the module.
 * @return {Object} Returns null if module or option doesn't exist.
 */
YouTubePlayer.prototype.setOption = function(moduleId, option, object) {};


/**
 * Calls an option method on the module
 * @param {string} moduleId The module descriptor id.
 * @param {string} option The option to call on the module.
 * @param {*} object Arbitrary data to be sent to the module.
 * @return {Object} Returns null if module or option doesn't exist.
 */
YouTubePlayer.prototype.getOption = function(moduleId, option, object) {};


/**
 * @return {?string} The current playlist's list id if there is a playlist and
 * that playlist was loaded from a list id, otherwise returns null.
 */
YouTubePlayer.prototype.getPlaylistId = function() {};


/**
 * Mutes the player.
 */
YouTubePlayer.prototype.mute = function() {};


/**
 * Unmutes the player.
 */
YouTubePlayer.prototype.unMute = function() {};


/**
 * @return {boolean} true if the player is muted, false if not.
 */
YouTubePlayer.prototype.isMuted = function() {};


/**
 * @param {number} volume The volume, an integer between 0 and 100.
 */
YouTubePlayer.prototype.setVolume = function(volume) {};


/**
 * @return {number} The player's current volume, an integer between 0 and 100.
 */
YouTubePlayer.prototype.getVolume = function() {};


/**
 * Seeks to the specified time of the video in seconds.
 * @param {number} seconds The offset to seek to.
 * @param {boolean=} opt_allowSeekAhead If true the player will make a new
 *     server request if seconds is beyond the currently loaded video data.
 */
YouTubePlayer.prototype.seekTo = function(seconds, opt_allowSeekAhead) {};


/**
 * @return {number} The state of the player. Possible values are unstarted
 *     (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
 */
YouTubePlayer.prototype.getPlayerState = function() {};


/**
 * Returns the current playback rate setting of the player.
 * @return {number} The current playback rate setting of the player.
 */
YouTubePlayer.prototype.getPlaybackRate = function() {};


/**
 * Sets the playback rate for the player based on the rate suggested by the
 * user. The actually applied rate is the closest supported rate that lies
 * between 1.0 and the suggested rate (inclusive). 1.0 will always be one
 * of the supported playback rates.
 * @param {number} suggestedRate The playback rate suggested by the user.
 */
YouTubePlayer.prototype.setPlaybackRate = function(suggestedRate) {};


/**
 * Gets an array of playback rates supported by the video player, sorted in
 * ascending order. This array is guaranteed to have the entry 1.0.
 * @return {Array.<number>} Playback rates supported by the player.
 */
YouTubePlayer.prototype.getAvailablePlaybackRates = function() {};


/**
 * @return {string} The current quality the player has loaded or is playing.
 */
YouTubePlayer.prototype.getPlaybackQuality = function() {};


/**
 * Sets the playback quality in the video player. If the quality is not the
 * current playing quality, the player will load the new quality.
 * @param {string} quality The video quality the player should load and play.
 */
YouTubePlayer.prototype.setPlaybackQuality = function(quality) {};


/**
 * @return {Array} Array of available quality levels in order of decreasing
 * quality.
 */
YouTubePlayer.prototype.getAvailableQualityLevels = function() {};


/**
 * @return {number}  The elapsed time in seconds since the video started
 * playing.
 */
YouTubePlayer.prototype.getCurrentTime = function() {};


/**
 * @return {number}  The duration in seconds of the currently playing video.
 */
YouTubePlayer.prototype.getDuration = function() {};


/**
 * @param {string} event The event to listen for.
 * @param {string|EventListener|Function} listener The function to call
 *     when the event occurs.
 * @override
 */
YouTubePlayer.prototype.addEventListener = function(event, listener) {};


/**
 * @return {string} The YouTube.com URL for the currently loaded/playing video.
 */
YouTubePlayer.prototype.getVideoUrl = function() {};


/**
 * @return {string} The embed code for the currently loaded/playing video.
 */
YouTubePlayer.prototype.getVideoEmbedCode = function() {};


/**
 * Loads the specified video's thumbnail and prepares the player to play the
 *     video.
 * @param {Object|string} videoIdOrObject YouTube Video ID or object.
 * @param {number=} opt_startSeconds The video will start from the keyframe
 *     nearest this time.
 */
YouTubePlayer.prototype.cueVideoById =
    function(videoIdOrObject, opt_startSeconds) {};


/**
 * Loads and plays the specified video.
 * @param {Object|string} videoIdOrObject YouTube Video ID or object.
 * @param {number=} opt_startSeconds The video will start from the keyframe
 *     nearest this time.
 */
YouTubePlayer.prototype.loadVideoById =
    function(videoIdOrObject, opt_startSeconds) {};


/**
 * Loads the specified video's thumbnail and prepares the player to play the
 * video.
 * @param {string} mediaContentUrl YouTube player URL in the format
 *     http://www.youtube.com/v/VIDEO_ID.
 * @param {number=} opt_startSeconds The video will start from the keyframe
 *     nearest this time.
 */
YouTubePlayer.prototype.cueVideoByUrl = function(mediaContentUrl,
                                                 opt_startSeconds) {};


/**
 * Loads and plays the specified video.
 * @param {string} mediaContentUrl YouTube player URL in the format
 *     http://www.youtube.com/v/VIDEO_ID.
 * @param {number=} opt_startSeconds The video will start from the keyframe
 *     nearest this time.
 */
YouTubePlayer.prototype.loadVideoByUrl = function(mediaContentUrl,
                                                  opt_startSeconds) {};


/**
 * Loads and plays a specified video in a playlist.
 * @param {string|Array|Object} playlistOrObject An object containing all of the
 *     parameters. Otherwise, a string that is a playlist id (without
 *     the PL list prefix) or an array of video ids.
 * @param {number=} opt_index The index to begin playback at.
 * @param {number=} opt_startSeconds Float/integer that specifies the time
 *     from which the video should start playing.
 * @param {string=} opt_suggestedQuality The suggested playback quality for
 *     the video.
 */
YouTubePlayer.prototype.cuePlaylist =  function(playlistOrObject,
    opt_index, opt_startSeconds, opt_suggestedQuality) {};


/**
 * Loads and cues a specified video in a playlist.
 * @param {string|Array|Object} playlistOrObject An object containing all of the
 *     parameters. Otherwise, a string that is a playlist id (without
 *     the PL list prefix) or an array of video ids.
 * @param {number=} opt_index The index to begin playback at.
 * @param {number=} opt_startSeconds Float/integer that specifies the time
 *     from which the video should start playing.
 * @param {string=} opt_suggestedQuality The suggested playback quality for
 *     the video.
 */
YouTubePlayer.prototype.loadPlaylist =  function(playlistOrObject,
    opt_index, opt_startSeconds, opt_suggestedQuality) {};


/**
 * Plays the next video in the playlist. At the end of the playlist, this will
 * go to the first video when loop is enabled, otherwise it will be a noop.
 */
YouTubePlayer.prototype.nextVideo = function() {};


/**
 * Plays the previous video in the playlist. At the front of the playlist, this
 * will go to the last video when loop is enabled, otherwise it will be a noop.
 */
YouTubePlayer.prototype.previousVideo = function() {};


/**
 * Plays a specific video in the playlist. If the provided index is not in the
 * playlist, this will be a noop.
 * @param {number} index The index of the video in the playlist to play.
 */
YouTubePlayer.prototype.playVideoAt = function(index) {};


/**
 * Shuffle the playlist when setting shuffle to true, or return the playlist to
 * the original order when setting to false.
 * @param {boolean} shuffle If the playlist should shuffle.
 */
YouTubePlayer.prototype.setShuffle = function(shuffle) {};


/**
 * @param {boolean} loop If the playlist should loop.
 */
YouTubePlayer.prototype.setLoop = function(loop) {};


/**
 * Sets the size in pixels of the player. You should not have to use this
 * method in JavaScript as the player will automatically resize when the
 * containing elements in the embed code have their height and width
 * properties modified.
 * @param {number} width Player width.
 * @param {number} height Player height.
 */
YouTubePlayer.prototype.setSize = function(width, height) {};


/**
 * Destroys the player reference.
 */
YouTubePlayer.prototype.destroy = function() {};


/**
 * On player ready callback.
 *
 * @param {string} playerapiid String identifier for a player.
 */
function onYouTubePlayerReady(playerapiid) {}


/**
 * On player ready callback.
 *
 * @param {string} playerapiid String identifier for a player.
 */
Window.prototype.onYouTubePlayerReady = function(playerapiid) {};
