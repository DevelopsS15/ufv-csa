import {
  SiC,
  SiCHex,
  SiCplusplus,
  SiCplusplusHex,
  SiCsharp,
  SiCsharpHex,
  SiCss3,
  SiCss3Hex,
  SiDocker,
  SiDockerHex,
  SiFortran,
  SiFortranHex,
  SiGo,
  SiGoHex,
  SiHtml5,
  SiHtml5Hex,
  SiIcon,
  SiJavascript,
  SiJavascriptHex,
  SiJson,
  SiKotlin,
  SiKotlinHex,
  SiMarkdown,
  SiMarkdownHex,
  SiNginx,
  SiNginxHex,
  SiPhp,
  SiPhpHex,
  SiPython,
  SiPythonHex,
  SiReact,
  SiReactHex,
  SiRuby,
  SiRubyHex,
  SiRust,
  SiRustHex,
  SiScala,
  SiScalaHex,
} from "@icons-pack/react-simple-icons";
import {
  AppAbbreviationName,
  AppFullName,
  AppLogoBlendedGreen,
} from "../../config";
import Image from "next/image";

// TODO: Add some networking/security -based code segments (NGINX)
export const CSACodeSnippets: {
  language: string;
  languageFullName: string;
  languageThemeColor: string;
  disableForMobile?: boolean;
  useLightBackground?: boolean;
  icon?: JSX.Element;
  code: string;
}[] = [
  {
    language: "plaintext",
    icon: (
      <Image
        className="mx-auto"
        src="/CSA_Leaf_512x512.png"
        alt={`${AppFullName} Logo`}
        width={24}
        height={24}
        quality={75}
      />
    ),
    languageFullName: AppAbbreviationName,
    languageThemeColor: AppLogoBlendedGreen,
    code: AppFullName,
  },
  {
    language: "markdown",
    languageFullName: "Markdown",
    icon: <SiMarkdown />,
    useLightBackground: true,
    languageThemeColor: SiMarkdownHex,
    code: `# ${AppFullName}`,
  },
  {
    language: "js",
    languageFullName: "Javascript",
    icon: <SiJavascript />,
    languageThemeColor: SiJavascriptHex,
    code: `console.log("${AppFullName}");`,
  },
  {
    language: "html",
    languageFullName: "HTML",
    icon: <SiHtml5 />,
    languageThemeColor: SiHtml5Hex,
    code: `<h1>${AppFullName}</h1>`,
  },
  {
    language: "css",
    languageFullName: "CSS",
    icon: <SiCss3 />,
    languageThemeColor: SiCss3Hex,
    code: `#Association{\n\tcontent: "${AppFullName}";\n}`,
  },
  {
    language: "php",
    languageFullName: "PHP",
    icon: <SiPhp />,
    languageThemeColor: SiPhpHex,
    code: `<?php\n\techo "${AppFullName}";\n?>`,
  },
  {
    language: "jsx",
    languageFullName: "React",
    icon: <SiReact />,
    languageThemeColor: SiReactHex,
    code: `const Association = () => {\n\treturn <>${AppFullName}</>;\n}`,
  },
  {
    language: "python",
    languageFullName: "Python",
    icon: <SiPython />,
    languageThemeColor: SiPythonHex,
    code: `print("${AppFullName}");`,
  },
  {
    language: "ruby",
    languageFullName: "Ruby",
    icon: <SiRuby />,
    languageThemeColor: SiRubyHex,
    code: `puts "${AppFullName}"`,
  },
  {
    language: "java",
    languageFullName: "Java",
    languageThemeColor: "#ec2124",
    disableForMobile: true,
    code: `public class Association {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("${AppFullName}");\n\t}\n}`,
  },
  {
    language: "kotlin",
    languageFullName: "Kotlin",
    icon: <SiKotlin />,
    languageThemeColor: SiKotlinHex,
    code: `fun main(){\n\tprintln("${AppFullName}")\n}`,
  },
  {
    language: "rust",
    languageFullName: "Rust",
    icon: <SiRust />,
    languageThemeColor: SiRustHex,
    useLightBackground: true,
    code: `fn main(){\n\tprintln!("${AppFullName}");\n}`,
  },
  {
    language: "go",
    languageFullName: "Go",
    icon: <SiGo />,
    languageThemeColor: SiGoHex,
    disableForMobile: true,
    code: `package main\nimport "fmt"\nfunc main() {\n\tfmt.Println("${AppFullName}")\n}`,
  },
  {
    language: `c`,
    languageFullName: "C",
    languageThemeColor: SiCHex,
    disableForMobile: true,
    code: `#include <stdio.h>\nint main() {\n\tprintf("${AppFullName}");\n\treturn 0;\n}`,
  },
  {
    language: "cpp",
    languageFullName: "C++",
    icon: <SiCplusplus />,
    languageThemeColor: SiCplusplusHex,
    disableForMobile: true,
    code: `#include <iostream>\nint main() {\n\tstd::cout << "${AppFullName}" << std::endl;\n\treturn 0;\n}`,
  },
  {
    language: "csharp",
    languageFullName: "C#",
    icon: <SiCsharp />,
    languageThemeColor: SiCsharpHex,
    disableForMobile: true,
    code: `using System;\nclass Association{\n\tstatic void Main(string[] args){\n\t\tConsole.WriteLine("${AppFullName}");\n\t}\n}`,
  },
  {
    language: "assembly",
    languageFullName: "Assembly",
    languageThemeColor: "#2e53a6",
    disableForMobile: true,
    code: `section .data\n\tassociation db '${AppFullName}', 0\nsection .text\n\tglobal _start\n_start:\n\tmov     eax, 1  ;\n\txor     ebx, ebx; \n\tint     0x80    ;`,
  },
  {
    language: "fortran",
    languageFullName: "Fortran",
    icon: <SiFortran />,
    languageThemeColor: SiFortranHex,
    code: `program Association\n\timplicit none\n\twrite(*, '(A)') "${AppFullName}"\n\tstop\nend program Association`,
  },
  {
    language: "cobol",
    languageFullName: "Cobol",
    languageThemeColor: SiCHex,
    code: `IDENTIFICATION DIVISION.\nPROGRAM-ID. Association.\nPROCEDURE DIVISION.\n\tDISPLAY "${AppFullName}".\n\tSTOP RUN.`,
  },
  {
    language: "basic",
    languageFullName: "BASIC",
    languageThemeColor: SiCHex,
    code: `2006 PRINT "${AppFullName}"\n${new Date().getFullYear()} END`,
  },
  {
    language: "pascal",
    languageFullName: "Pascal",
    languageThemeColor: SiCHex,
    code: `program Association;\nbegin\n\twriteln('${AppFullName}');\nend.`,
  },
  {
    language: "scala",
    languageFullName: "Scala",
    icon: <SiScala />,
    languageThemeColor: SiScalaHex,
    code: `def main(args: Array[String]): Unit = {\n\tprintln("${AppFullName}")\n}`,
  },
  {
    language: "nginx",
    languageFullName: "NGINX",
    icon: <SiNginx />,
    languageThemeColor: SiNginxHex,
    disableForMobile: true,
    code: `server {\n\tlisten 80;\n\tserver_name csa.ufv.ca;\n\tlocation / {\n\t\treturn 200 "${AppFullName}";\n\t}\n}`,
  },
  {
    language: "tcl",
    languageFullName: "TCL",
    languageThemeColor: "",
    code: `proc getAssociation {} {\n\tputs "${AppFullName}"\n}\ngetAssociation`,
  },
  {
    language: "docker",
    languageFullName: "Docker",
    icon: <SiDocker />,
    languageThemeColor: SiDockerHex,
    code: `FROM ubuntu:22.04\nCMD echo "${AppFullName}"`,
  },
  {
    language: "yang",
    languageFullName: "YANG",
    languageThemeColor: "",
    code: `module Association {\n\tnamespace "urn:csa.ufv.ca";\n\tprefix csa;\n\tdescription "${AppFullName}";\n}`,
  },
  {
    language: "json",
    languageFullName: "JSON",
    icon: <SiJson />,
    languageThemeColor: "#acadad",
    code: `{\n\t"Name": "${AppFullName}"\n}`,
  },
  {
    language: "xml",
    languageFullName: "XML",
    languageThemeColor: "#015fac",
    code: `<?xml version="1.0"?>\n<Association>\n\t<Name>${AppFullName}</Name>\n</Association>`,
  },
  {
    language: "sql",
    languageFullName: "SQL",
    languageThemeColor: "#db7432",
    code: `CREATE TABLE Association(\n\tName VARCHAR(2006) DEFAULT ("${AppFullName}")\n);`,
  },
  {
    language: "plaintext",
    languageFullName: "Binary",
    languageThemeColor: "#FFFFFF",
    disableForMobile: true,
    code: "01000011 01101111 01101101 01110000 01110101 01110100 01101001 01101110 01100111 00100000 01010011 01110100 01110101 01100100 01100101 01101110 01110100 00100000 01000001 01110011 01110011 01101111 01100011 01101001 01100001 01110100 01101001 01101111 01101110",
  },
];
