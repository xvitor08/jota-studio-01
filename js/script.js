/* CONFIGURE AQUI: substitua pelo WhatsApp com DDI e DDD, somente números. Ex.: 5573999999999 */
const WHATSAPP_NUMBER = "5573981070967";
const $ = (s)=>document.querySelector(s);
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function openWhatsApp(text){
 if(WHATSAPP_NUMBER==="5500000000000"){toast("Configure seu número de WhatsApp no código para ativar o contato.");return}
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(text),"_blank","noopener");
}
$("#menuBtn").addEventListener("click",()=>$("#navlinks").classList.toggle("open"));
document.querySelectorAll("#navlinks a").forEach(a=>a.addEventListener("click",()=>$("#navlinks").classList.remove("open")));
document.querySelectorAll(".quote").forEach(b=>b.addEventListener("click",()=>{const p=b.dataset.plan;$("#service").value=p==="Landing page"?"Landing page":p==="Site institucional"?"Site institucional":p==="Catálogo ou loja virtual"?"Catálogo on-line / delivery":"Outro projeto";$("#contato").scrollIntoView({behavior:"smooth"});$("#name").focus()}));
$("#contactForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#name").value.trim(),service=$("#service").value,message=$("#message").value.trim();openWhatsApp("Olá! Meu nome é "+name+". Tenho interesse em: "+service+". "+(message?"Sobre o projeto: "+message:"Gostaria de conversar sobre um orçamento.") )});
$("#whatsBtn").addEventListener("click",e=>{e.preventDefault();openWhatsApp("Olá! Conheci a Jota Studio pelo site e gostaria de saber mais sobre os serviços.")});
$("#year").textContent=new Date().getFullYear();
