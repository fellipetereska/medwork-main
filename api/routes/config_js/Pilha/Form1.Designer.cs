namespace Pilha
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btnEmpilhar = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.numValorEmpilhar = new System.Windows.Forms.NumericUpDown();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.button1 = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.numValorDesmpilhado = new System.Windows.Forms.NumericUpDown();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.lbxPilha = new System.Windows.Forms.ListBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtTopo = new System.Windows.Forms.TextBox();
            this.chkVazia = new System.Windows.Forms.CheckBox();
            this.chkCheia = new System.Windows.Forms.CheckBox();
            this.btnVerificarStatus = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numValorEmpilhar)).BeginInit();
            this.groupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numValorDesmpilhado)).BeginInit();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnEmpilhar);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.numValorEmpilhar);
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(310, 60);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "[ Push - Empilhar]";
            // 
            // btnEmpilhar
            // 
            this.btnEmpilhar.Location = new System.Drawing.Point(168, 18);
            this.btnEmpilhar.Name = "btnEmpilhar";
            this.btnEmpilhar.Size = new System.Drawing.Size(75, 23);
            this.btnEmpilhar.TabIndex = 2;
            this.btnEmpilhar.Text = "Empilhar";
            this.btnEmpilhar.UseVisualStyleBackColor = true;
            this.btnEmpilhar.Click += new System.EventHandler(this.btnEmpilhar_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 23);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(31, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Valor";
            // 
            // numValorEmpilhar
            // 
            this.numValorEmpilhar.Location = new System.Drawing.Point(60, 19);
            this.numValorEmpilhar.Name = "numValorEmpilhar";
            this.numValorEmpilhar.Size = new System.Drawing.Size(93, 20);
            this.numValorEmpilhar.TabIndex = 0;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.button1);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Controls.Add(this.numValorDesmpilhado);
            this.groupBox2.Location = new System.Drawing.Point(12, 78);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(310, 60);
            this.groupBox2.TabIndex = 1;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "[ Pop - Desempilhar]";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(218, 18);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 2;
            this.button1.Text = "Desempilhar";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 23);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(101, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Valor desemplilhado";
            // 
            // numValorDesmpilhado
            // 
            this.numValorDesmpilhado.Location = new System.Drawing.Point(119, 19);
            this.numValorDesmpilhado.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            -2147483648});
            this.numValorDesmpilhado.Name = "numValorDesmpilhado";
            this.numValorDesmpilhado.ReadOnly = true;
            this.numValorDesmpilhado.Size = new System.Drawing.Size(93, 20);
            this.numValorDesmpilhado.TabIndex = 0;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.lbxPilha);
            this.groupBox3.Location = new System.Drawing.Point(12, 144);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(122, 262);
            this.groupBox3.TabIndex = 2;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "[ Pilha ]";
            // 
            // lbxPilha
            // 
            this.lbxPilha.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lbxPilha.FormattingEnabled = true;
            this.lbxPilha.Location = new System.Drawing.Point(3, 16);
            this.lbxPilha.Name = "lbxPilha";
            this.lbxPilha.Size = new System.Drawing.Size(116, 243);
            this.lbxPilha.TabIndex = 0;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(157, 162);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(32, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "Topo";
            // 
            // txtTopo
            // 
            this.txtTopo.Location = new System.Drawing.Point(198, 158);
            this.txtTopo.Name = "txtTopo";
            this.txtTopo.ReadOnly = true;
            this.txtTopo.Size = new System.Drawing.Size(42, 20);
            this.txtTopo.TabIndex = 6;
            // 
            // chkVazia
            // 
            this.chkVazia.AutoSize = true;
            this.chkVazia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.chkVazia.Location = new System.Drawing.Point(198, 184);
            this.chkVazia.Name = "chkVazia";
            this.chkVazia.Size = new System.Drawing.Size(49, 17);
            this.chkVazia.TabIndex = 7;
            this.chkVazia.Text = "Vazia";
            this.chkVazia.UseVisualStyleBackColor = true;
            // 
            // chkCheia
            // 
            this.chkCheia.AutoSize = true;
            this.chkCheia.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.chkCheia.Location = new System.Drawing.Point(198, 207);
            this.chkCheia.Name = "chkCheia";
            this.chkCheia.Size = new System.Drawing.Size(50, 17);
            this.chkCheia.TabIndex = 8;
            this.chkCheia.Text = "Cheia";
            this.chkCheia.UseVisualStyleBackColor = true;
            // 
            // btnVerificarStatus
            // 
            this.btnVerificarStatus.Location = new System.Drawing.Point(160, 230);
            this.btnVerificarStatus.Name = "btnVerificarStatus";
            this.btnVerificarStatus.Size = new System.Drawing.Size(145, 23);
            this.btnVerificarStatus.TabIndex = 9;
            this.btnVerificarStatus.Text = "Verificar Status da pilha";
            this.btnVerificarStatus.UseVisualStyleBackColor = true;
            this.btnVerificarStatus.Click += new System.EventHandler(this.btnVerificarStatus_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(339, 418);
            this.Controls.Add(this.btnVerificarStatus);
            this.Controls.Add(this.chkCheia);
            this.Controls.Add(this.chkVazia);
            this.Controls.Add(this.txtTopo);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "PILHA";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numValorEmpilhar)).EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numValorDesmpilhado)).EndInit();
            this.groupBox3.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btnEmpilhar;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.NumericUpDown numValorEmpilhar;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.NumericUpDown numValorDesmpilhado;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.ListBox lbxPilha;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtTopo;
        private System.Windows.Forms.CheckBox chkVazia;
        private System.Windows.Forms.CheckBox chkCheia;
        private System.Windows.Forms.Button btnVerificarStatus;
    }
}

