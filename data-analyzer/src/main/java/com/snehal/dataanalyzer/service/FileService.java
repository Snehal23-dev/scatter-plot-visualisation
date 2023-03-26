package com.snehal.dataanalyzer.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.snehal.dataanalyzer.model.ScatterPlot;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileService {
    
    List<ScatterPlot> scatterPlotList = new ArrayList<>();

    public List<ScatterPlot> uploadFile(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            // return new ResponseEntity<List<ScatterPlot>>(new ArrayList(), HttpStatus.BAD_REQUEST);
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
        } catch (Exception e) {
            log.error("File upload failed", e);
            throw new Exception("File upload failed");
        }
        return scatterPlotList;
    }

    public List<ScatterPlot> getData() {
        return scatterPlotList;
    }
}
