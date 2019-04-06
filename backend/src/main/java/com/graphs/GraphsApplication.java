package com.graphs;

//import org.python.core.PyCode;
//import org.python.util.PythonInterpreter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.script.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Properties;

@SpringBootApplication
public class GraphsApplication {

	public static void main(String[] args) throws IOException, FileNotFoundException, ScriptException {
		SpringApplication.run(GraphsApplication.class, args);

//        PythonInterpreter interpreter = null;
//        try{
//            Properties p = new Properties();
//            p.setProperty("python.path", "C:\\Jython\\jython-standalone-2.7.0.jar");
//            p.setProperty("python.home", "C:\\Jython\\jython-standalone-2.7.0.jar");
//            p.setProperty("python.prefix", "C:\\Jython\\jython-standalone-2.7.0.jar");
//            PythonInterpreter.initialize(System.getProperties(), p, new String[] {});
//            interpreter = new PythonInterpreter();
//        }catch(Exception ex){
//            ex.printStackTrace();
//        }
//
//        interpreter.exec("import C:\\Users\\Alexander\\IdeaProjects\\graphs\\backend\\src\\main\\python\\calculator.py");

//        String command = "python /c start python path\to\script\script.py";
//        Process p = Runtime.getRuntime().exec(command + param );

        StringWriter writer = new StringWriter(); //ouput will be stored here

        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptContext context = new SimpleScriptContext();

        context.setWriter(writer); //configures output redirection
        ScriptEngine engine = manager.getEngineByName("python");
        engine.eval(new FileReader("C:\\Users\\Alexander\\IdeaProjects\\graphs\\backend\\src\\main\\python\\calculator.py"), context);
        System.out.println(writer.toString());
    }
}
