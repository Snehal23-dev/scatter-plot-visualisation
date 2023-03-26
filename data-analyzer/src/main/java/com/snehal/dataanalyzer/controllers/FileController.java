package com.snehal.dataanalyzer.controllers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.snehal.dataanalyzer.model.ScatterPlot;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/file")
@Slf4j
public class FileController {

    List<ScatterPlot> scatterPlotList = new ArrayList<>();

    @GetMapping()
    public ResponseEntity<List<ScatterPlot>> getFileData() {
        return new ResponseEntity<List<ScatterPlot>>(scatterPlotList, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("Got file: {}", file);
        if (file.isEmpty()) {
            return new ResponseEntity<String>("File empty", HttpStatus.BAD_REQUEST);
        }

        scatterPlotList.clear();

        try {
            byte[] bytes = file.getBytes();
            String completeData = new String(bytes);
            String[] rows = completeData.split("\n");
            Arrays.stream(rows)
                    .skip(1)
                    .forEach(row -> {
                        String[] columns = row.split(",");
                        ScatterPlot scatterData = new ScatterPlot();

                        scatterData.setX(Float.parseFloat(columns[0]));
                        scatterData.setY(Float.parseFloat(columns[1]));
                        scatterPlotList.add(scatterData);
                    });
            log.info("ArrayList: {}", scatterPlotList);

        } catch (Exception e) {
            log.error("File upload failed", e);
            return new ResponseEntity<String>("File uploadfailed" + file.getOriginalFilename(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<String>("File uploaded successfully" + file.getOriginalFilename(), HttpStatus.OK);
    }
}
