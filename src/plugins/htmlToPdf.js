import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import Vue from 'vue'

Vue.prototype.$pdf = function (dom, user) {
  html2Canvas(dom).then(canvas => {
    const contentWidth = canvas.width
          const contentHeight = canvas.height
          // 一页pdf显示html页面生成的canvas高度;
          const pageHeight = (contentWidth / 592.28) * 841.89
          // 未生成pdf的html页面高度
          let leftHeight = contentHeight
          // 页面偏移
          let position = 0
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = 595.28
          const imgHeight = (592.28 / contentWidth) * contentHeight
          const pageData = canvas.toDataURL('image/jpeg', 1.0)
          console.log(pageData)
          // a4纸纵向，一般默认使用；new JsPDF('landscape'); 横向页面
          const PDF = new JsPDF('', 'pt', 'a4')

          // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            // 超过一页时，分页打印（每页高度841.89）
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
    }
    PDF.save(user)
    // const [AWidth, AHeight] = [595.28, 841.89]; // a4
    // let position = 0;
    // let { width: CWidth, height: CHeight } = canvas;
    // const PWidth = AWidth;
    // const PHeight = (AWidth / CWidth) * CHeight;
    // const jpeg = canvas.toDataURL("image/jpeg", 1.0);
    // const doc = new JsPDF("", "pt", "a4");

    // if (CHeight < PHeight) {
    //   doc.addImage(jpeg, "JPEG", 0, 0, PWidth, PHeight);
    // } else {
    //   while (CHeight > 0) {
    //     doc.addImage(jpeg, "JPEG", 0, position, PWidth, PHeight);
    //     CHeight -= PHeight;
    //     position -= AHeight;
    //     if (CHeight > 0) {
    //       doc.addPage();
    //     }
    //   }
    // }
    // doc.save(user);
  });
}



