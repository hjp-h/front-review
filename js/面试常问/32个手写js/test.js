var longestPalindrome = function(s) {
    // 判断是否是回文数
    const isPalindrome = function(str){
        let temp = ''
        // 从最后一位开始截取
        const len = str.length;
        for(let i = len-1;i>=0;i--){
            temp += str[i];
        }
        if(temp === str){
            return true;
        }
        return false;
    }
    let max = Number.MIN_VALUE;
    let result = '';
    for(let i=0;i<s.length;i++){
        for(let j=1;j<=s.length-i;j++){
            let temp = s.substr(i,j);
            console.log('temp',temp)
            if(isPalindrome(temp) && temp.length>max){
                result = temp;
                max = temp.length;
            }
        }
    }
    return result;
};
longestPalindrome('abb');
