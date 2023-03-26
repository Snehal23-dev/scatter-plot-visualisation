package com.snehal.dataanalyzer.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.snehal.dataanalyzer.model.ScatterPlot;
import com.snehal.dataanalyzer.service.FileService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/file")
@Slf4j
public class FileController {

    @Autowired
    FileService fileService;

    

    @GetMapping()
    public ResponseEntity<List<ScatterPlot>> getFileData() {
        log.info("getFileData");
        return new ResponseEntity<List<ScatterPlot>>(fileService.getData(), HttpStatus.OK);
    }
    

    @PostMapping("/upload")
    public ResponseEntity<List<ScatterPlot>> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("uploadFile");
        if (file.isEmpty()) {
            return new ResponseEntity<List<ScatterPlot>>(new ArrayList(), HttpStatus.BAD_REQUEST);
        }
        try {
            return new ResponseEntity<List<ScatterPlot>>(fileService.uploadFile(file), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<List<ScatterPlot>>(new ArrayList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
