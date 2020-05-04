import React from "react";

function HowItWorks() {
  return (
    <div
      class="apply-process-area apply-bg pt-150 pb-150"
      style={{
        backgroundImage: "url(" + require("assets/img/how-applybg.png") + ")",
      }}
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-tittle white-text text-center">
              <span>Proces prijavljivanja na oglas</span>
              <h2>Kako funkcionise</h2>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="single-process text-center mb-30">
              <div class="process-ion">
                <span class="flaticon-search"></span>
              </div>
              <div class="process-cap">
                <h5>1. Pretrazi oglas</h5>
                <p>
                  Pretrazi sve oglase i pronadji onaj koj itebi najvise odgovara
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-process text-center mb-30">
              <div class="process-ion">
                <span class="flaticon-curriculum-vitae"></span>
              </div>
              <div class="process-cap">
                <h5>2. Prijavi se na oglas</h5>
                <p>Prijavi se na oglas jednostavnom klikom na dugme prijavi</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="single-process text-center mb-30">
              <div class="process-ion">
                <span class="flaticon-tour"></span>
              </div>
              <div class="process-cap">
                <h5>3. Osvoji posao</h5>
                <p>Cekaj da te poslodavac kontaktira i da osvojis posao</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
