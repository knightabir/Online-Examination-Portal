package com.exam.controller;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService; // Add the QuizService dependency

    // Add Question service
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // Update Question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    // Get all Questions
    @GetMapping("/")
    public ResponseEntity<?> questions() {
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    // Get single Question
    @GetMapping("/{qid}")
    public Question getQuestion(@PathVariable("qid") Long qid) {
        return this.questionService.getQuestion(qid);
    }

    // Delete Question
    @DeleteMapping("/{qid}")
    public void delete(@PathVariable("qid") Long qid) {
        this.questionService.deleteQuestion(qid);
    }

    // Get Quiz by Question ID
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
//        Quiz quiz = new Quiz();
//        quiz.setQid((qid));
//        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();

        List list = new ArrayList(questions);
        if (list.size()>Integer.parseInt(quiz.getNumberOfQuestion())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestion() + 1));
        }
        Collections.shuffle(list);
        System.out.println(list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
        Quiz quiz = new Quiz();
        quiz.setQid((qid));
        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);
    }

    @GetMapping("/category/{cid}")
    public  List<Quiz> getQuizzesOfCategory(@PathVariable("cid") Long cid){
        Category category = new Category();
        category.setCid(cid);
        return this.quizService.getQuizOfCategory(category);
    }

    //evaluate quiz
//    @PostMapping("/eval-quiz")
//    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
//        System.out.println(questions);
//        return ResponseEntity.ok("Got questions with answer");
//    }
}
