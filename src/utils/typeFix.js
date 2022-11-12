export default function typeFix(a, b) {
    switch (a) {
        case 1:
          b = "本科生招募类";
          break;
        case 2:
          b = "研究生、老师招募类";
          break;
        case 3:
          b = "三下乡";
          break;
        case 4:
          b = "互联网+";
          break;
        case 5:
          b = "电子工程";
          break;
        case 6:
          b = "智能机器人";
          break;
        case 7:
          b = "艺术类";
          break;
        case 8:
          b = "数学建模";
          break;
        case 9:
          b = "acm";
          break;
        case 10:
          b = "辩论";
          break;
        case 11:
          b = "实验室招募类";
          break;
        case 12:
          b = "实验室项目类";
          break;
        case 13:
          b = "实验室比赛类";
          break;
        case 14:
          b = "实验室打杂类";
          break;
        default:
          b = "";
      }
    return b
}