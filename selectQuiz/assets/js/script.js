import { quizList } from "./quizList.js";

const QuizModule = (() => {
    let quizCount = 0;

    // 문항 클릭시
    const mathAnswer = (selectedBtn, btns) => {
        const userSelect = parseInt(selectedBtn.data('numb'));
        
        selectedBtn.addClass('selected');
        
        if (userSelect === quizList[quizCount].answer) {
            $('.result-area .wrong-box').hide();
            btns.attr('disabled', true);

            if (quizCount < quizList.length - 1) {
                $('.btn-nextQuiz').show();
            } else {
                $('.btn-getResult').show();
            }
        } else {
            $('.result-area .wrong-box').show();
        }
    };

    // 퀴즈 업데이트
    const updateQuiz = (count) => {
        $('.btn-nextQuiz').hide();
        
        $('.question-box').html(`<p class="que">${quizList[count].question}</p>`);
        $('.answer-list-box').html(
            quizList[count].answerList
                .map((answer, index) => `<button type="button" data-numb="${index + 1}">${answer}</button>`)
                .join('')
        );

        const answerListBtn = $('.answer-list-box button');
        answerListBtn.off('click').on('click', function() {
            answerListBtn.removeClass('selected');
            mathAnswer($(this), answerListBtn);
        });
    };

    // 다음 단계 버튼 클릭 시
    const getNextStep = () => {
        $('.btn-nextQuiz').off('click').on('click', () => {
            quizCount++;
            updateQuiz(quizCount);
        });
    };

    // 초기화
    const init = () => {
        updateQuiz(quizCount);
        getNextStep();
    };

    return {
        init
    };
})();

QuizModule.init();

// event3
let count = 0;
const items = $('#select input');
items.change(function(){
    $(this).is(':checked') ? count++ : count--;
    $('#width').css('width', `${count * (100 / items.length)}%`)
});