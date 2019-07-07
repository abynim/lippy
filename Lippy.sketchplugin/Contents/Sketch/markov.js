class Markov {
    // source: https://gist.github.com/kevincennis/5440878
    // basic usage: new Markov(lotsOfText).generate()
    
    // markov chain constructor
    //
    // @string input {example text}
    // @integer len {optional # of words to output}
    // @integer stateSize {optional chain order}
    constructor(input, len, stateSize) {
        this.cache = Object.create(null)
        this.words = input.replace(/\./g,'').split(/\s+/)
        this.startwords = [this.words[0]]
        this.stateSize = stateSize || 2
        this.outputSize = len || 100
        this.analyzed = false
    }
    
    // return a random element from an array
    choose(arr) {
        return arr[~~( Math.random() * arr.length )]
    }
    
    // get the next set of words as a string
    getNextSet(i) {
        return this.words.slice(i, i + this.stateSize).join(' ')
    }
    
    // create a markov lookup
    analyze(input) {
        var len = this.words.length, next
        this.words.forEach(function( word, i ){
                           next = this.getNextSet(++i)
                           ;(this.cache[word] = this.cache[word] || []).push(next)
                           ;/[A-Z]/.test(word[0]) && this.startwords.push(word)
                           }.bind(this))
        return this.analyzed = true && this
    }
    
    // generate new text from a markov lookup
    generate() {
        var seed, arr, choice, curr, i = 1
        !this.analyzed && this.analyze()
        arr = [seed = this.choose(this.startwords)]
        for ( ; i < this.outputSize; i += this.stateSize ){
            arr.push(choice = this.choose(curr || this.cache[seed]))
            curr = this.cache[choice.split(' ').pop()]
        }
        var ret = arr.join(' ')
        if (ret.charAt(ret.length - 1) == ',') {
            ret = ret.slice(0,-1)
        }
        return ret.charAt(0).toUpperCase() + ret.slice(1).toLowerCase() + '.'
    }
}

module.exports = Markov
