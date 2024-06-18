namespace Fila
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
            this.btnAdicionar = new System.Windows.Forms.Button();
            this.lbxFila = new System.Windows.Forms.ListBox();
            this.txtAdicionar = new System.Windows.Forms.TextBox();
            this.txtRetirado = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btnRetirar = new System.Windows.Forms.Button();
            this.btnEstado = new System.Windows.Forms.Button();
            this.txtPrimeiro = new System.Windows.Forms.TextBox();
            this.txtUltimo = new System.Windows.Forms.TextBox();
            this.txtTamanho = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnAdicionar
            // 
            this.btnAdicionar.Location = new System.Drawing.Point(384, 28);
            this.btnAdicionar.Name = "btnAdicionar";
            this.btnAdicionar.Size = new System.Drawing.Size(120, 30);
            this.btnAdicionar.TabIndex = 0;
            this.btnAdicionar.Text = "Adicionar";
            this.btnAdicionar.UseVisualStyleBackColor = true;
            this.btnAdicionar.Click += new System.EventHandler(this.btnAdicionar_Click);
            // 
            // lbxFila
            // 
            this.lbxFila.FormattingEnabled = true;
            this.lbxFila.ItemHeight = 20;
            this.lbxFila.Location = new System.Drawing.Point(114, 92);
            this.lbxFila.Name = "lbxFila";
            this.lbxFila.ScrollAlwaysVisible = true;
            this.lbxFila.Size = new System.Drawing.Size(264, 224);
            this.lbxFila.TabIndex = 2;
            // 
            // txtAdicionar
            // 
            this.txtAdicionar.Location = new System.Drawing.Point(114, 28);
            this.txtAdicionar.Name = "txtAdicionar";
            this.txtAdicionar.Size = new System.Drawing.Size(264, 26);
            this.txtAdicionar.TabIndex = 3;
            // 
            // txtRetirado
            // 
            this.txtRetirado.Location = new System.Drawing.Point(114, 60);
            this.txtRetirado.Name = "txtRetirado";
            this.txtRetirado.ReadOnly = true;
            this.txtRetirado.Size = new System.Drawing.Size(264, 26);
            this.txtRetirado.TabIndex = 4;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(24, 35);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(75, 20);
            this.label1.TabIndex = 5;
            this.label1.Text = "Adicionar";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(29, 67);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(70, 20);
            this.label2.TabIndex = 6;
            this.label2.Text = "Retirado";
            // 
            // btnRetirar
            // 
            this.btnRetirar.Location = new System.Drawing.Point(384, 60);
            this.btnRetirar.Name = "btnRetirar";
            this.btnRetirar.Size = new System.Drawing.Size(120, 30);
            this.btnRetirar.TabIndex = 7;
            this.btnRetirar.Text = "Retirar";
            this.btnRetirar.UseVisualStyleBackColor = true;
            this.btnRetirar.Click += new System.EventHandler(this.btnRetirar_Click);
            // 
            // btnEstado
            // 
            this.btnEstado.Location = new System.Drawing.Point(384, 132);
            this.btnEstado.Name = "btnEstado";
            this.btnEstado.Size = new System.Drawing.Size(120, 30);
            this.btnEstado.TabIndex = 8;
            this.btnEstado.Text = "Estado da fila";
            this.btnEstado.UseVisualStyleBackColor = true;
            this.btnEstado.Click += new System.EventHandler(this.btnEstado_Click);
            // 
            // txtPrimeiro
            // 
            this.txtPrimeiro.Location = new System.Drawing.Point(384, 188);
            this.txtPrimeiro.Name = "txtPrimeiro";
            this.txtPrimeiro.ReadOnly = true;
            this.txtPrimeiro.Size = new System.Drawing.Size(79, 26);
            this.txtPrimeiro.TabIndex = 9;
            // 
            // txtUltimo
            // 
            this.txtUltimo.Location = new System.Drawing.Point(384, 240);
            this.txtUltimo.Name = "txtUltimo";
            this.txtUltimo.ReadOnly = true;
            this.txtUltimo.Size = new System.Drawing.Size(79, 26);
            this.txtUltimo.TabIndex = 10;
            // 
            // txtTamanho
            // 
            this.txtTamanho.Location = new System.Drawing.Point(384, 290);
            this.txtTamanho.Name = "txtTamanho";
            this.txtTamanho.ReadOnly = true;
            this.txtTamanho.Size = new System.Drawing.Size(79, 26);
            this.txtTamanho.TabIndex = 11;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(384, 165);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(66, 20);
            this.label3.TabIndex = 12;
            this.label3.Text = "Primeiro";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(384, 217);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(54, 20);
            this.label4.TabIndex = 13;
            this.label4.Text = "Último";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(384, 269);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(76, 20);
            this.label5.TabIndex = 14;
            this.label5.Text = "Tamanho";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(384, 96);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(120, 30);
            this.button1.TabIndex = 15;
            this.button1.Text = "Recriar Fila";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(557, 339);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtTamanho);
            this.Controls.Add(this.txtUltimo);
            this.Controls.Add(this.txtPrimeiro);
            this.Controls.Add(this.btnEstado);
            this.Controls.Add(this.btnRetirar);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtRetirado);
            this.Controls.Add(this.txtAdicionar);
            this.Controls.Add(this.lbxFila);
            this.Controls.Add(this.btnAdicionar);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Fila";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnAdicionar;
        private System.Windows.Forms.ListBox lbxFila;
        private System.Windows.Forms.TextBox txtAdicionar;
        private System.Windows.Forms.TextBox txtRetirado;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnRetirar;
        private System.Windows.Forms.Button btnEstado;
        private System.Windows.Forms.TextBox txtPrimeiro;
        private System.Windows.Forms.TextBox txtUltimo;
        private System.Windows.Forms.TextBox txtTamanho;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button button1;
    }
}

